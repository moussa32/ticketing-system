"use server"

import { addSurvey } from "@/lib/services/surveyService";

export async function submitSurvey(formData) {
    try {
        const rate = formData.get("rate");
        const satisfaction = formData.get("satisfaction");
        const feedback=formData.get("comments");
        
        console.log("Submitting survey...", { rate, satisfaction, feedback });
        const userId= formData.get("userId");
        await addSurvey(rate, satisfaction, feedback, userId);
            return { ok: true, message: `Survey submitted successfully!` };
    } catch (error) {
            return { ok: false, message: "Failed to submit complaint" };
    }
}