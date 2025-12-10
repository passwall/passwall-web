import React from 'react'
import Head from 'next/head'

import Layout from '../components/layout'
import LeftSide from '../components/leftside'
import RightSide from '../components/rightside'
import BottomBar from '../components/bottombar'
import Text from '../components/text'

function PrivacyPage() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy - Passwall</title>
        <meta name="description" content="Passwall Privacy Policy - Learn how we protect your data and privacy" />
      </Head>
      <Layout className="contentBody">
        <LeftSide />
        <RightSide>
          <div className="container privacy-policy">
            <Text tag="h1" theme="heromd">
              Privacy Policy
            </Text>
            <Text tag="p" theme="small" className="last-updated">
              Last Updated: December 10, 2025
            </Text>

            <div className="policy-content">
              <section>
                <Text tag="h2" theme="heading">
                  1. Introduction
                </Text>
                <Text tag="p" theme="medium">
                  Passwall ("we," "us," or "our") is committed to protecting your privacy and ensuring the security of your personal information. As an open-source password manager, we understand the critical importance of data security and transparency in our operations.
                </Text>
                <Text tag="p" theme="medium">
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our password management services, website, browser extensions, and mobile applications (collectively, the "Services").
                </Text>
              </section>

              <section>
                <Text tag="h2" theme="heading">
                  2. Our Zero-Knowledge Architecture
                </Text>
                <Text tag="p" theme="medium">
                  Passwall operates on a zero-knowledge security model. This means:
                </Text>
                <ul>
                  <li>
                    <Text tag="p" theme="medium">
                      Your master password is never sent to our servers and is known only to you
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      All encryption and decryption of your vault data happens locally on your device
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      We store only encrypted versions of your data that we cannot decrypt or access
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      Even if compelled by law, we cannot provide unencrypted vault data because we don't have access to it
                    </Text>
                  </li>
                </ul>
              </section>

              <section>
                <Text tag="h2" theme="heading">
                  3. Information We Collect
                </Text>
                
                <Text tag="h3" theme="regular" className="subsection-title">
                  3.1 Information You Provide
                </Text>
                <ul>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Account Information:</strong> Email address, name, and master password (encrypted locally)
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Encrypted Vault Data:</strong> Passwords, notes, credit card information, and other data you choose to store (all encrypted with your master password)
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Payment Information:</strong> Billing details processed by our payment processor (we do not store complete credit card numbers)
                    </Text>
                  </li>
                </ul>

                <Text tag="h3" theme="regular" className="subsection-title">
                  3.2 Automatically Collected Information
                </Text>
                <ul>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Device Information:</strong> Browser type, operating system, device identifiers
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Usage Data:</strong> Login timestamps, IP addresses, feature usage statistics
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Cookies and Similar Technologies:</strong> To maintain sessions and improve user experience
                    </Text>
                  </li>
                </ul>
              </section>

              <section>
                <Text tag="h2" theme="heading">
                  4. How We Use Your Information
                </Text>
                <Text tag="p" theme="medium">
                  We use the collected information for the following purposes:
                </Text>
                <ul>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Service Provision:</strong> To provide, maintain, and improve our password management services
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Account Management:</strong> To create and manage your account, verify your identity, and provide customer support
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Security:</strong> To detect, prevent, and address technical issues, fraud, and security incidents
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Communication:</strong> To send you service updates, security alerts, and administrative messages
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Analytics:</strong> To analyze usage patterns and improve our Services (using aggregated, anonymized data)
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Compliance:</strong> To comply with legal obligations and enforce our terms of service
                    </Text>
                  </li>
                </ul>
              </section>

              <section>
                <Text tag="h2" theme="heading">
                  5. Data Sharing and Disclosure
                </Text>
                <Text tag="p" theme="medium">
                  We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:
                </Text>
                <ul>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our Services (e.g., cloud hosting, payment processing) under strict confidentiality agreements
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Legal Requirements:</strong> When required by law, court order, or governmental request
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (with advance notice to users)
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Protection of Rights:</strong> To protect our rights, property, safety, or that of our users and the public
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>With Your Consent:</strong> When you explicitly authorize us to share specific information
                    </Text>
                  </li>
                </ul>
                <Text tag="p" theme="medium">
                  <strong>Important Note:</strong> Due to our zero-knowledge architecture, we cannot share your vault contents as we do not have the ability to decrypt them.
                </Text>
              </section>

              <section>
                <Text tag="h2" theme="heading">
                  6. Data Security
                </Text>
                <Text tag="p" theme="medium">
                  We implement industry-standard security measures to protect your data:
                </Text>
                <ul>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Encryption:</strong> AES-256 bit encryption for your vault data
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Secure Transmission:</strong> TLS/SSL encryption for all data in transit
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Hashing:</strong> Your master password is locally hashed using PBKDF2-SHA256 before transmission
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Infrastructure Security:</strong> Regular security audits, penetration testing, and monitoring
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Access Controls:</strong> Strict internal access controls and authentication mechanisms
                    </Text>
                  </li>
                </ul>
                <Text tag="p" theme="medium">
                  However, no method of transmission over the Internet is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.
                </Text>
              </section>

              <section>
                <Text tag="h2" theme="heading">
                  7. Data Retention
                </Text>
                <Text tag="p" theme="medium">
                  We retain your personal information for as long as necessary to:
                </Text>
                <ul>
                  <li>
                    <Text tag="p" theme="medium">
                      Provide our Services and maintain your account
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      Comply with legal obligations, resolve disputes, and enforce our agreements
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      Achieve the purposes outlined in this Privacy Policy
                    </Text>
                  </li>
                </ul>
                <Text tag="p" theme="medium">
                  When you delete your account, we will delete your encrypted vault data and personal information, except where retention is required by law or for legitimate business purposes (e.g., fraud prevention, security).
                </Text>
              </section>

              <section>
                <Text tag="h2" theme="heading">
                  8. Your Privacy Rights
                </Text>
                <Text tag="p" theme="medium">
                  Depending on your location, you may have the following rights:
                </Text>
                <ul>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Access:</strong> Request access to your personal information
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Correction:</strong> Request correction of inaccurate or incomplete data
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Deletion:</strong> Request deletion of your personal information
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Portability:</strong> Request a copy of your data in a portable format
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Objection:</strong> Object to certain processing of your data
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Restriction:</strong> Request restriction of processing in certain circumstances
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Withdraw Consent:</strong> Withdraw previously given consent
                    </Text>
                  </li>
                </ul>
                <Text tag="p" theme="medium">
                  To exercise these rights, please contact us at <a href="mailto:privacy@passwall.io">privacy@passwall.io</a>
                </Text>
              </section>

              <section>
                <Text tag="h2" theme="heading">
                  9. International Data Transfers
                </Text>
                <Text tag="p" theme="medium">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and applicable laws, including:
                </Text>
                <ul>
                  <li>
                    <Text tag="p" theme="medium">
                      Standard Contractual Clauses approved by the European Commission
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      Adequacy decisions for certain countries
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      Other legally approved transfer mechanisms
                    </Text>
                  </li>
                </ul>
              </section>

              <section>
                <Text tag="h2" theme="heading">
                  10. Children's Privacy
                </Text>
                <Text tag="p" theme="medium">
                  Our Services are not intended for children under the age of 16. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately at <a href="mailto:privacy@passwall.io">privacy@passwall.io</a>, and we will take steps to delete such information.
                </Text>
              </section>

              <section>
                <Text tag="h2" theme="heading">
                  11. Cookies and Tracking Technologies
                </Text>
                <Text tag="p" theme="medium">
                  We use cookies and similar tracking technologies to:
                </Text>
                <ul>
                  <li>
                    <Text tag="p" theme="medium">
                      Maintain your session and remember your preferences
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      Analyze usage patterns and improve our Services
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      Provide security features and detect fraudulent activity
                    </Text>
                  </li>
                </ul>
                <Text tag="p" theme="medium">
                  You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our Services.
                </Text>
              </section>

              <section>
                <Text tag="h2" theme="heading">
                  12. Third-Party Links
                </Text>
                <Text tag="p" theme="medium">
                  Our Services may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any information.
                </Text>
              </section>

              <section>
                <Text tag="h2" theme="heading">
                  13. Changes to This Privacy Policy
                </Text>
                <Text tag="p" theme="medium">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by:
                </Text>
                <ul>
                  <li>
                    <Text tag="p" theme="medium">
                      Posting the new Privacy Policy on this page
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      Updating the "Last Updated" date
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      Sending you an email notification (for significant changes)
                    </Text>
                  </li>
                </ul>
                <Text tag="p" theme="medium">
                  Your continued use of our Services after any changes indicates your acceptance of the updated Privacy Policy.
                </Text>
              </section>

              <section>
                <Text tag="h2" theme="heading">
                  14. GDPR Compliance (EEA, UK, and Switzerland)
                </Text>
                <Text tag="p" theme="medium">
                  If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have additional rights under the General Data Protection Regulation (GDPR):
                </Text>
                <ul>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Legal Basis:</strong> We process your data based on consent, contractual necessity, legal obligations, or legitimate interests
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Data Protection Officer:</strong> You may contact our DPO at <a href="mailto:dpo@passwall.io">dpo@passwall.io</a>
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      <strong>Supervisory Authority:</strong> You have the right to lodge a complaint with your local data protection authority
                    </Text>
                  </li>
                </ul>
              </section>

              <section>
                <Text tag="h2" theme="heading">
                  15. California Privacy Rights (CCPA/CPRA)
                </Text>
                <Text tag="p" theme="medium">
                  If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):
                </Text>
                <ul>
                  <li>
                    <Text tag="p" theme="medium">
                      Right to know what personal information is collected, used, shared, or sold
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      Right to delete personal information
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      Right to opt-out of the sale or sharing of personal information (Note: We do not sell personal information)
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      Right to correct inaccurate personal information
                    </Text>
                  </li>
                  <li>
                    <Text tag="p" theme="medium">
                      Right to non-discrimination for exercising your privacy rights
                    </Text>
                  </li>
                </ul>
                <Text tag="p" theme="medium">
                  To exercise these rights, contact us at <a href="mailto:privacy@passwall.io">privacy@passwall.io</a> or call us at 1-800-PASSWALL (if applicable).
                </Text>
              </section>

              <section>
                <Text tag="h2" theme="heading">
                  16. Contact Us
                </Text>
                <Text tag="p" theme="medium">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:
                </Text>
                <div className="contact-info">
                  <Text tag="p" theme="medium">
                    <strong>Email:</strong> <a href="mailto:privacy@passwall.io">privacy@passwall.io</a>
                  </Text>
                  <Text tag="p" theme="medium">
                    <strong>General Inquiries:</strong> <a href="mailto:hello@passwall.io">hello@passwall.io</a>
                  </Text>
                  <Text tag="p" theme="medium">
                    <strong>Website:</strong> <a href="https://passwall.io">https://passwall.io</a>
                  </Text>
                </div>
              </section>

              <section className="acknowledgment">
                <Text tag="p" theme="medium">
                  <em>
                    By using Passwall, you acknowledge that you have read and understood this Privacy Policy and agree to its terms. We are committed to protecting your privacy and maintaining the trust you place in us to safeguard your most sensitive information.
                  </em>
                </Text>
              </section>
            </div>
          </div>
          <BottomBar />
        </RightSide>
      </Layout>
    </Layout>
  )
}

export default PrivacyPage

