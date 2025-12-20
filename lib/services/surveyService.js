import { CustomerSurvey } from "../../lib/database/models";
export async function addSurvey(rating, satisfy, feedback, userId) {   
    try {
        const survey = await CustomerSurvey.create({
            rating,
            satisfaction: satisfy,
            feedback,
            user_id: userId
        });
        return survey;
    } catch (error) {
        throw new Error(error.message);
    }   
}