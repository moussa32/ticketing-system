export default function FAQView() { 
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <main className="flex-1 p-20 items-center justify-center">

                <div className="text-center">
                    <h1 className="text-xl font-semibold p-4">Frequently Asked Questions (FAQ)</h1>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="faq-item border-b pb-4">
                        <h2 className="text-lg font-medium">Q1: How do I create a support ticket?</h2>  


                        <p className="mt-2 text-gray-700">
                            A1: To create a support ticket, navigate to the "Create Ticket" section, fill out the required details about your issue, and submit the form. You will receive a confirmation email with your ticket ID.
                        </p>
                    </div>      
                    <div className="faq-item border-b pb-4">
                        <h2 className="text-lg font-medium">Q2: How can I check the status of my ticket?</h2>
                        <p className="mt-2 text-gray-700">
                            A2: You can check the status of your ticket by logging into your account and navigating to the "My Tickets" section. Here, you will find a list of all your tickets along with their current status and any updates from our support team.
                        </p>

                    </div>      
                    <div className="faq-item border-b pb-4">
                        <h2 className="text-lg font-medium">Q3: What should I do if I need to update my ticket?</h2>            

                        <p className="mt-2 text-gray-700">
                            A3: If you need to update your ticket, simply go to the "My Tickets" section, select the ticket you wish to update, and add any additional information or comments. You can also attach files if necessary.
                        </p>
                    </div>      
                    <div className="faq-item border-b pb-4">
                        <h2 className="text-lg font-medium">Q4: How long does it typically take to resolve a ticket?</h2>       
                        <p className="mt-2 text-gray-700">


                            A4: The resolution time for tickets can vary depending on the complexity of the issue. However, our support team strives to address and resolve tickets as quickly as possible, typically within 24 to 72 hours.
                        </p>
                    </div>      
                </div>
            </main>
        </div>
    );
}