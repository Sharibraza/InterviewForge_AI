const { GoogleGenAI, Type, Schema } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAPI_API_KEY
});

// For AI
const interviewReportSchema = z.object({
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
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day of the preparation plan, starting from Day 1, Day 2, etc."),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
});

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate an interview report for a candidate with the following details :
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription} 
`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    matchScore: {
                        type: Type.INTEGER,
                        description: "A score between 0 and 100 indicating how well the candidate's profile matches the job describe"
                    },
                    technicalQuestions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING, description: "The technical question can be asked in the interview" },
                                intention: { type: Type.STRING, description: "The intention of interviewer behind asking the question in the interview" },
                                answer: { type: Type.STRING, description: "How to answer this question" }
                            },
                        },
                        description: "Technical questions that can be asked in the interview"
                    },
                    behavioralQuestions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING, description: "The behavioral question can be asked in the interview" },
                                intention: { type: Type.STRING, description: "The intention of interviewer behind asking the question in the interview" },
                                answer: { type: Type.STRING, description: "How to answer this question" }
                            }
                        },
                        description: "Behavioral questions that can be asked in the interview"
                    },
                    skillGaps: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                skill: { type: Type.STRING, description: "The skill which the candidate is lacking" },
                                severity: { type: Type.STRING, enum: ["low", "medium", "high"], description: "The severity of the skill gap" }
                            }
                        },
                        description: "List of skill gaps that the candidate has"
                    },
                    preparationPlan: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                day: { type: Type.INTEGER, description: "The day of the preparation plan" },
                                focus: { type: Type.STRING, description: "The main focus of this day" },
                                tasks: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING },
                                    description: "List of tasks to be done on this day"
                                }
                            }
                        }, description: "A day-wise preparation plan"
                    },
                    title: {
                        type: Type.STRING,
                        description: "The title of the job for which the interview report is generated"
                    },
                }
            }
            // or simple use -->
            // responseSchema: zodToJsonSchema(interviewReportSchema) // <-- Change this line back
        }
    });

    return JSON.parse(response.text);
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "5mm",
            bottom: "5mm",
            left: "10mm",
            right: "10mm"
        }
    })

    await browser.close()

    return pdfBuffer
}


async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume and must score ATS score of 100.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                        The Resume must be in single page and avoid breaking it into multiple pages. Use appropriate headings, bullet points, and sections to organize the content effectively.
                    `

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: 
            // zodToJsonSchema(resumePdfSchema),
            {
                type: Type.OBJECT,
                properties: {
                    html: { type: Type.STRING, description: "The HTML content of the resume which can be converted to PDF using any library like puppeteer" }
                }
            },
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}


module.exports = { generateInterviewReport, generateResumePdf }