import { Resend } from "resend";

const resend = new Resend("re_3MU4Yh3m_E6JQ88nYZcxAY8LAwNueB3XS");
async function sendMail(link: string, email: string) {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: `${email}`,
    subject: "Hello World",
    html: `<strong><a href="${link}" style="display:inline-block;padding:10px 20px;
background:#4CAF50;color:#fff;text-decoration:none;border-radius:4px;">
Click Here to Login
</a>
</strong>`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}

export default sendMail;
