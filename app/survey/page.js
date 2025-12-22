"use client";
import toast from "react-hot-toast";
import { submitSurvey } from "./action";

export default function Survey() {


    async function submit(formData) {
        const res = await submitSurvey(formData);
        if (res.ok) {
            toast.success(res.message);
        } else {
            toast.error("Failed to submit survey");
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <main className="flex-1 p-20 items-center justify-center">
                
                <div className="text-center">
                    <h1 className="text-xl font-semibold p-4">Customer Care Survey</h1>
                </div>

                <form
                    action={submit}
                    className="space-y-6 max-w-2xl mx-auto"
                >

                    {/* Question 1 */}
                    <div className="form-group">
                        <label>1. How satisfied are you with our customer service overall?</label>

                        <div className="radio-options space-y-1 mt-2">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="rate" value="5" required />
                                5 (Excellent)
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="radio" name="rate" value="4" />
                                4 (Very Good)
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="radio" name="rate" value="3" />
                                3 (Average)
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="radio" name="rate" value="2" />
                                2 (Poor)
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="radio" name="rate" value="1" />
                                1 (Very Poor)
                            </label>
                        </div>
                    </div>

                    {/* Question 2 */}
                    <div className="form-group">
                        <label>2. Was the support team’s response time appropriate?</label>

                        <div className="radio-options space-y-1 mt-2">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="satisfaction" value="Y" required />
                                Yes
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="radio" name="satisfaction" value="N" />
                                No
                            </label>
                        </div>
                    </div>

                    {/* Question 3 */}
                    <div className="form-group">
                        <label htmlFor="comments">3. Do you have any additional comments you would like to share?</label>
                        <textarea
                            id="comments"
                            name="comments"
                            rows="4"
                            className="border p-2 rounded-md w-full"
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Submit Survey
                    </button>
                </form>
            </main>
        </div>
    );
}
