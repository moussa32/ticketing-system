"use server"
export async function submitSurvey(formData) {
    try {
        const rate = formData.get("rate");
        const satisfaction = formData.get("satisfaction");
        const comments=formData.get("comments");
        console.log("Submitting survey...", { rate, satisfaction, comments });
            return { ok: true, message: `Survey submitted successfully!` };
    } catch (error) {
            return { ok: false, message: "Failed to submit complaint" };
    }
}