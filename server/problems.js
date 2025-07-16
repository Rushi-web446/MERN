import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


// MongoDB model
const problemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  url: String,
  tag: [String],
  difficulty: String,
  acceptance_rate: String
});


const Problem = mongoose.model("Problem", problemSchema);

// LeetCode GraphQL query for one problem
const getProblemDetails = async (slug) => {
  const query = {
    query: `
      query getQuestionDetail($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionId
          title
          titleSlug
          difficulty
          stats
          topicTags {
            name
          }
        }
      }
    `,
    variables: {
      titleSlug: slug
    }
  };

  const response = await axios.post("https://leetcode.com/graphql", query, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = response.data.data.question;

  const stats = JSON.parse(data.stats);
  const acceptance = parseFloat(stats.acRate).toFixed(2) + "%";

  return {
    id: parseInt(data.questionId),
    name: data.title,
    url: `https://leetcode.com/problems/${data.titleSlug}`,
    difficulty: data.difficulty,
    acceptance_rate: acceptance,
    tag: data.topicTags.map(t => t.name)
  };
};

// Main function to loop through slugs and save to DB
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");

  const allProblems = await axios.get("https://leetcode.com/api/problems/all/");
  const list = allProblems.data.stat_status_pairs;

  // Limit to 20 for demo/testing (remove for full)
  const limitedList = list.slice(0, 20);

  for (const p of limitedList) {
    try {
      const slug = p.stat.question__title_slug;
      const fullData = await getProblemDetails(slug);

      await Problem.findOneAndUpdate(
        { id: fullData.id },
        fullData,
        { upsert: true, new: true }
      );

      console.log(`✅ Saved: ${fullData.name}`);
    } catch (err) {
      console.error(`❌ Failed: ${p.stat.question__title_slug}`);
    }
  }

  console.log("✅ All fetched and saved.");
  process.exit();
}

main();
