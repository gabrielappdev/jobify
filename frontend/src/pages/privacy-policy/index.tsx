import { Box, Container, Divider, Heading } from "@chakra-ui/react";
import { assignIndexData } from "helpers";
import { DataType } from "pages/Home";
import Template from "templates";

const PrivacyPolicy = ({ data }: DataType) => {
  return (
    <Template data={data}>
      <Container maxW="7xl" as="section" p={4} mt={32}>
        <Heading as="h2" size="md">
          Privacy Policy
        </Heading>
        <Divider my={4} />
        <Box
          sx={{
            "& h4": {
              fontSize: "md",
              lineHeight: "md",
              fontWeight: "bold",
              mb: 2,
            },
            "& p": {
              fontSize: "md",
              lineHeight: "md",
              mb: 2,
              ml: { base: 2, md: 4 },
            },
          }}
        >
          <h4>1. We respect your privacy</h4>
          <p>
            1.1. Gabriel Costa's Jobify respects your right to privacy and is
            committed to safeguarding the privacy of our customers and software
            application users. We adhere to the National Privacy Principles
            established by the Privacy Act 1988 (Cth). This policy sets out how
            we collect and treat your personal information.
          </p>
          <p>
            1.2.&quot;Personal information&quot; is information we hold which is
            identifiable as being about you.
          </p>
          <p>
            1.3. &quot;Site&quot; is reference to the &quot;Luigi Jobs&quot;
            website and application.
          </p>
          <h4>2. Collection of personal information</h4>
          <p>
            2.1. Gabriel Costa's Jobify will, from time to time, receive and
            store personal information you enter onto our Site, provide to us
            directly or give to us in other forms.
          </p>
          <p>
            2.2. You will be required to provide personal information such as
            your name, date of birth, gender, address, mobile and main phone
            numbers, citizenship status, drivers licence number, TFN, ABN (if
            applicable), educational and language background, employment
            history, availability and personal preferences for work to enable us
            to send information, provide updates and process your product or
            service order.
          </p>
          <p>
            2.3. We may collect additional information at other times, including
            but not limited to, when you provide feedback, when you provide
            information about your personal or business affairs, change your
            content or email preference, respond to surveys and/or promotions,
            provide financial or credit card information, or communicate with
            our customer support.
          </p>
          <p>
            2.4. Additionally, we may also collect any other information you
            provide while interacting with us.
          </p>
          <h4>3. How we collect your personal information</h4>
          <p>
            3.1. Gabriel Costa's Jobify collects personal information from you
            in a variety of ways, including when you interact with us
            electronically or in person, when you access our Site and when we
            provide our services to you. This personal information is obtained
            from business and employee signup, from job matches, job listings
            and any additional information provided and from third parties.
          </p>
          <p>
            3.2. We do not guarantee website links or policy of authorised third
            parties. Information about employee interaction with job listings
            and job offers made to an employee will be retained. We collect
            information about what types of content you engage with, accounts
            you interact with, frequency and duration of activity and the medium
            (website or app) that you use. We may receive personal information
            from third parties. If we do, we will protect it as set out in this
            Privacy Policy.
          </p>
          <h4>4. Use and disclosure of your personal information</h4>
          <p>
            4.1. Gabriel Costa's Jobify will use your personal information
            collected from you to match you to available jobs and businesses. We
            may also use personal information collected from you to provide you
            with information, updates and our services. We may also make you
            aware of new and additional products, services and opportunities
            available to you. We may use your personal information to improve
            our products and services and better understand your needs.
          </p>
          <p>
            4.2. We collect your personal information for the primary purpose of
            providing our services to you of creating accurate job matches,
            providing information to our users, clients and marketing. We may
            also use your personal information for secondary purposes closely
            related to the primary purpose, to test, develop and improve the
            software, algorithm and Site by conducting surveys,
            testing/troubleshooting and research. We will use the information to
            promote the security, integrity and safety of the Site. This will be
            done by preventing suspicious activity, spam and harmful activity.
          </p>
          <p>
            4.3. The Application may make third party social media features
            available to its users. We cannot ensure the security of any
            information you choose to make public in a social media feature.
            Also, we cannot ensure that parties who have access to such publicly
            available information will respect your privacy. We may contact you
            by a variety of measures including, but not limited to telephone,
            email, sms or mail.
          </p>
          <h4>5. Disclosure of your personal information</h4>
          <p>
            5.1. We may disclose your personal information to any of our
            employees, officers, insurers, professional advisers, agents,
            suppliers or subcontractors insofar as reasonably necessary for the
            purposes set out in this Policy.
          </p>
          <p>
            5.2. Your Personal Information may be disclosed in a number of
            circumstances including the following:
          </p>
          <p>
            • For the purpose of matching your profile with other users of the
            Site including potential businesses or employees, whichever is
            relevant.
          </p>
          <p>
            • Sharing public profiles of the potential employee or business’
            with other users of the Site.
          </p>
          <p>• Third parties where you consent to the use or disclosure; and</p>
          <p>• Where required or authorised by law.</p>
          <p>
            5.3. We may also use your personal information to protect the
            copyright, trademarks, legal rights, property or safety of
            Buggaluggs Pty Ltd, its application, website and customers or third
            parties.
          </p>
          <p>
            5.4. Information that we collect may from time to time be stored,
            processed in or transferred between parties located in countries
            outside of Australia. When providing personal information to us,
            please be aware that there are risks involved in transmitting such
            information across the internet.
          </p>
          <p>
            5.5. If there is a change of control in our business or a sale or
            transfer of business assets, we reserve the right to transfer to the
            extent permissible at law our user databases, together with any
            personal information and non-personal information contained in those
            databases. This information may be disclosed to a potential
            purchaser under an agreement to maintain confidentiality. We would
            seek to only disclose information in good faith and where required
            by any of the above circumstances.
          </p>
          <p>
            5.6. By providing us with personal information, you consent to the
            terms of this Privacy Policy and the types of disclosure covered by
            this Policy. Where we disclose your personal information to third
            parties, we will request that the third party follow this Policy
            regarding handling your personal information.
          </p>
          <p>
            5.7. Non-identifiable anonymous data may be shared with third
            parties if it is required to improve our services.
          </p>
          <h4>6. Security of your personal information</h4>
          <p>
            6.1. Gabriel Costa's Jobify is committed to ensuring that the
            information you provide to us is secure. In order to prevent
            unauthorised access or disclosure, we have put in place suitable
            physical, electronic and managerial procedures to safeguard and
            secure information and protect it from misuse, interference, loss
            and unauthorised access, modification and disclosure.
          </p>
          <p>
            6.2. The transmission and exchange of information is carried out at
            your own risk. We cannot guarantee the security of any information
            that you transmit to us, or receive from us. Although we take
            measures to safeguard against unauthorised disclosures of
            information, we cannot assure you that personal information that we
            collect will not be disclosed in a manner that is inconsistent with
            this Privacy Policy.
          </p>
          <p>
            6.3. We will not be liable for any breach of security or unintended
            loss or disclosure of information due to the Site being linked to
            the internet.
          </p>
          <h4>7. Access to your personal information</h4>
          <p>
            7.1. You may request details of personal information that we hold
            about you in accordance with the provisions of the Privacy Act
            1988(Cth). A small administrative fee may be payable for the
            provision of information. If you would like a copy of the
            information which we hold about you or believe that any information
            we hold on you is inaccurate, out of date, incomplete, irrelevant or
            misleading, please email us at info@luigi.jobs.
          </p>
          <p>
            7.2. We reserve the right to refuse to provide you with information
            that we hold about you, in certain circumstances set out in the
            Privacy Act.
          </p>
          <h4>8. Complaints about privacy</h4>
          <p>
            8.1. If you have any complaints about our privacy practices, please
            feel free to send in details of your complaints to info@luigi.jobs
            We take complaints very seriously and will respond shortly after
            receiving written notice of your complaint.
          </p>
          <h4>9. Op out right</h4>
          <p>
            9.1. You can stop all collection of information by the Application
            easily by uninstalling the Application. You may use the standard
            uninstall processes as may be available as part of your mobile
            device or via the mobile application marketplace or network. You can
            also request to opt-out via email, at info@luigi.jobs.
          </p>
          <p>
            9.2. You can cancel your profile and account at any time but your
            details may remain on our database, although your account is no
            longer active.
          </p>
          <h4>10. Changes to Privacy Policy</h4>
          <p>
            10.1. Please be aware that we may change this Privacy Policy in the
            future. We may modify this Policy at any time, in our sole
            discretion and all modifications will be effective immediately upon
            our posting of the modifications on our website or notice board.
            Please check back from time to time to review our Privacy Policy.
          </p>
          <h4>11. Software Application</h4>
          <p>11.1. When you use our Application</p>
          <p>
            When you come to our Site we may collect certain information such as
            mobile unique device ID, the IP address of your mobile device,
            mobile operating system, the type of mobile internet browsers you
            use, and information about the way you use the Application. This
            information is used in an aggregated manner to analyse how people
            use our site, such that we can improve our service.
          </p>
          <p>11.2. Cookies</p>
          <p>
            We may from time to time use cookies on our Site. Cookies are very
            small files which a website uses to identify you when you come back
            to the application and to store details about your use of the Site.
            Cookies are not malicious programs that access or damage your
            computer, tablet or smartphone. Most devices automatically accept
            cookies but you can choose to reject cookies by changing your devise
            settings. However, this may prevent you from taking full advantage
            of our Site.
          </p>
          <p>11.3. Automatic collection</p>
          <p>
            Our Site may collect certain information automatically, including,
            but not limited to, the type of mobile device you use, your mobile
            devices unique device ID, the IP address of your mobile device, your
            mobile operating system, the type of mobile Internet browsers you
            use, and information about the way you use the Site.
          </p>
          <p>11.4. Third parties</p>
          <p>
            Our Site may from time to time have links to other applications or
            websites not owned or controlled by us. These links are meant for
            your convenience only. Links to third party applications and
            websites do not constitute sponsorship or endorsement or approval of
            these third parties. Please be aware that Gabriel Costa's Jobify is
            not responsible for the privacy practises of other such applications
            or websites. We encourage our users to be aware, when they leave our
            application or website, to read the privacy statements of each and
            every application or website that collects personal identifiable
            information.
          </p>
          <p>11.5. Geo-location</p>
          <p>
            When you visit the mobile application, we may use GPS technology (or
            other similar technology) to determine your current location in
            order to determine the city you are located within and display a
            location map with relevant advertisements. We will not share your
            current location with other users or partners.
          </p>
        </Box>
      </Container>
    </Template>
  );
};

export async function getServerSideProps() {
  return assignIndexData(false);
}

export default PrivacyPolicy;
