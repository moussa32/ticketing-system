"use server"
export async function submitFAQ(formData) {
    try {
        const question = formData.get("question");
        const answer = formData.get("answer");
        console.log("Submitting FAQ...", { question, answer });
            return { ok: true, message: `FAQ submitted successfully!` };
    } catch (error) {
            return { ok: false, message: "Failed to submit FAQ" };
    }   
}