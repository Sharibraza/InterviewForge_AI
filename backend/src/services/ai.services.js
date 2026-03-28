const {GoogleGenAI} = require("@google/genai");
const { z } =  require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_GENAPI_API_KEY
});

// For AI
const interviewReportSchema  = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking the question in the interview"),
        answer: z.string().describe("How to answer this question, what points to cover, what to avoid while answering this question, what approach to take while answering this question, how to structure the answer for this question"),
    })).describe("Technical questions that can be asked in the interview, along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking the question in the interview"),
        answer: z.string().describe("How to answer this question, what points to cover, what to avoid while answering this question, what approach to take while answering this question, how to structure the answer for this question"),
    })).describe("Behavioral questions that can be asked in the interview, along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking and needs to work on to be a better fit for the job role"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap, how important is it for the candidate to work on this skill gap to be a better fit for the job role"),
    })).describe("List of skill gaps that the candidate has, along with their severity "),
    preparationPlan : z.array(z.object({
        day: z.string().describe("The day of the preparation plan, starting from Day 1, Day 2, etc."),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
})

async function generateInterviewReport({resume,selfDescription, jobDescription}) {

     const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents : prompt,
        config: {
            responseMimeType : "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema), 
        }
    })

    return JSON.parse(response.text);
}

module.exports = generateInterviewReport;