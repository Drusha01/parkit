import React from 'react';
import { Link, usePage } from '@inertiajs/react'

import { RenterLayout } from '../../../../Layout/RenterLayout.jsx';

export default function RenterPrivacy() {
    return (
        <>
            <RenterLayout>
                <div className="main-content w-full lg:w-4/5  ">   
                    <div className="bg-white min-h-screen py-10 rounded-xl shadow-lg">
                        <div className="max-w-4xl mx-auto  bg-white">
                            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                            Privacy Policy
                            </h1>
                            <p className="text-lg text-text-gray-800 mb-6">
                            This Privacy Policy outlines how we collect, use, store, and protect your personal data in accordance with the Data Privacy Act of 2012 (Republic Act No. 10173) and other applicable laws in the Philippines.
                            </p>

                            <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                1. Personal Data We Collect
                            </h2>
                            <p className="text-text-gray-800">
                                We may collect the following personal data from you when you interact with our services:
                            </p>
                            <ul className="list-disc pl-6 mt-2 text-text-gray-800">
                                <li>Contact Information: Name, email address, phone number, and mailing address.</li>
                                <li>Account Information: Usernames, passwords, and other details related to your account.</li>
                                <li>Payment Information: Credit card details, bank account numbers, and other payment data.</li>
                                <li>Technical Data: IP address, device type, browser type, and other data related to your website or app usage.</li>
                                <li>Location Data: Your location information if enabled for tracking.</li>
                                <li>Other Information: Any data you voluntarily provide to us.</li>
                            </ul>
                            </section>

                            <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                2. How We Use Your Personal Data
                            </h2>
                            <p className="text-text-gray-800">
                                We may use your personal data for the following purposes:
                            </p>
                            <ul className="list-disc pl-6 mt-2 text-text-gray-800">
                                <li>Providing Services: To provide you with the requested services, process payments, and manage your account.</li>
                                <li>Improving Our Services: To enhance your user experience and optimize our services based on usage patterns and feedback.</li>
                                <li>Marketing and Promotions: To send marketing materials and promotions, subject to your consent.</li>
                                <li>Legal Compliance: To comply with legal obligations, resolve disputes, and protect our rights.</li>
                                <li>Security: To protect against unauthorized access or misuse of your data and prevent fraud.</li>
                            </ul>
                            </section>

                            <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                3. Data Retention
                            </h2>
                            <p className="text-text-gray-800">
                                We retain your personal data as long as necessary to fulfill the purposes outlined in this policy or as required by law. When no longer needed, we will securely delete or anonymize your data.
                            </p>
                            </section>

                            <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                4. Sharing Your Personal Data
                            </h2>
                            <p className="text-text-gray-800">
                                We may share your personal data with the following parties:
                            </p>
                            <ul className="list-disc pl-6 mt-2 text-text-gray-800">
                                <li>Service Providers: Third-party vendors who assist us with our operations.</li>
                                <li>Legal Authorities: When required by law or to protect our rights.</li>
                                <li>Business Partners: For joint promotions, with your consent.</li>
                            </ul>
                            </section>

                            <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                5. Security of Your Data
                            </h2>
                            <p className="text-text-gray-800">
                                We implement reasonable measures to protect your personal data from unauthorized access, disclosure, or destruction. However, no system is 100% secure.
                            </p>
                            </section>

                            <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                6. Your Rights as a Data Subject
                            </h2>
                            <p className="text-text-gray-800">
                                Under the Data Privacy Act of 2012, you have the following rights regarding your personal data:
                            </p>
                            <ul className="list-disc pl-6 mt-2 text-text-gray-800">
                                <li>Right to Access: You can request access to your personal data.</li>
                                <li>Right to Correction: You can request the correction of any inaccurate or incomplete data.</li>
                                <li>Right to Erasure: You can request the deletion or destruction of your personal data.</li>
                                <li>Right to Object: You can object to the processing of your data under certain conditions.</li>
                                <li>Right to Data Portability: You can request a copy of your data in a format that is transferable to another service provider.</li>
                                <li>Right to Withdraw Consent: You may withdraw consent for processing at any time.</li>
                            </ul>
                            </section>

                            <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                7. Cookies and Tracking Technologies
                            </h2>
                            <p className="text-text-gray-800">
                                We use cookies and similar technologies to collect data on your interactions with our website and services. You can manage cookies through your browser settings.
                            </p>
                            </section>

                            <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                8. Third-Party Links
                            </h2>
                            <p className="text-text-gray-800">
                                Our website may contain links to third-party sites. We are not responsible for their privacy practices, and we encourage you to review their policies.
                            </p>
                            </section>

                            <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                9. Changes to This Privacy Policy
                            </h2>
                            <p className="text-text-gray-800">
                                We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.
                            </p>
                            </section>

                            <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                10. Contact Us
                            </h2>
                            <p className="text-text-gray-800">
                                If you have any questions or concerns about this Privacy Policy, please contact us at:
                            </p>
                            <p className="text-text-gray-800 mt-2">
                                <strong>Email:</strong> parkakisupport@gmail.com
                            </p>
                            <p className="text-text-gray-800">
                                <strong>Phone:</strong> 09232623741
                            </p>
                            </section>
                        </div>
                    </div>
                </div>
            </RenterLayout>
        </>
    )
};
