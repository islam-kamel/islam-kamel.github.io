import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { Icon } from "@iconify/react";

import { subtitle, title } from "@/components/primitives";
import Animate from "@/components/animate";
import { cv } from "@/config/cv";
import DownPageIndicator from "@/components/down-page-indicator";
import WorkDetails from "@/components/work-details";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className={"container"}>
      <section
        className={
          "grid grid-rows-1 auto-rows-max max-h-[900px] h-[calc(100svh-64px)]"
        }
      >
        <Animate className="flex flex-col items-center justify-center  gap-4  relative">
          <div className="inline-block max-w-xl text-center justify-center">
            <Animate
              animate={{ opacity: 1 }}
              as={"h1"}
              className={title()}
              initial={{ opacity: 0 }}
              title={siteConfig.name}
            >
              Islam Kamel
            </Animate>
            <div>
              <Animate
                animate={{ opacity: 1 }}
                as={"p"}
                className={title({ color: "yellow" })}
                initial={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
              >
                Software Engineer
              </Animate>
            </div>
            <Animate transition={{ delay: 0.2 }}>
              <p className={subtitle()}>
                Passionate about continuous learning and skill development,
                always striving to achieve the best results through teamwork and
                collaboration.
              </p>
            </Animate>
          </div>

          <Animate transition={{ delay: 0.3 }}>
            <div className="flex gap-3">
              <Link
                isExternal
                className={buttonStyles({
                  radius: "full",
                  variant: "shadow",
                  class: "text-white bg-linkedin",
                })}
                href="https://www.linkedin.com/in/islam-al-saghir/"
                title={"linkedin"}
              >
                <Icon
                  className={"text-xl"}
                  icon={"akar-icons:linkedin-box-fill"}
                />
                LinkedIn
              </Link>
              <Link
                isExternal
                className={buttonStyles({
                  variant: "bordered",
                  radius: "full",
                })}
                href="https://github.com/islam-kamel"
                title={"github"}
              >
                <Icon className={"text-2xl"} icon={"mdi:github"} />
                GitHub
              </Link>
            </div>
          </Animate>

          <DownPageIndicator />
        </Animate>
      </section>
      <Animate as={"main"} className={"mx-auto max-w-3xl mt-5"}>
        <div
          className="bg-content1/40 shadow rounded-lg p-6 backdrop-blur-2xl border border-default"
          id={"cv"}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Animate>
                <h6 className="font-semibold">{cv.location.label}:</h6>
                <p>{cv.location.value}</p>
              </Animate>
              <Animate>
                <h6 className="font-semibold mt-4">Contact:</h6>
                <ul className="list-disc ml-5">
                  {cv.contact.map((contact, index) => (
                    <li key={index}>
                      <Animate transition={{ delay: index * 0.1 }}>
                        {contact.label}: {contact.value}
                      </Animate>
                    </li>
                  ))}
                </ul>
              </Animate>
            </div>

            <Animate>
              <div>
                <h6 className="font-semibold">{cv.languages.label}:</h6>
                <ul className="list-disc ml-5">
                  {cv.languages.items.map((lang, idx) => (
                    <li key={idx}>
                      <Animate transition={{ delay: idx * 0.1 }}>
                        {lang}
                      </Animate>
                    </li>
                  ))}
                </ul>

                <h6 className="font-semibold mt-4">
                  {cv.certifications.label}:
                </h6>
                <ul className="list-disc ml-5">
                  {cv.certifications.items.map((cert, idx) => (
                    <li key={idx}>
                      <Animate transition={{ delay: idx * 0.1 }}>
                        {cert}
                      </Animate>
                    </li>
                  ))}
                </ul>
              </div>
            </Animate>
          </div>

          <Animate
            as={"hr"}
            className="my-4 border-default"
            initial={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.5 }}
            whileInView={{ width: "auto", opacity: 1 }}
          />

          <Animate>
            <h6 className="font-semibold">{cv.summary.label}</h6>
            <p className="mb-4">{cv.summary.value}</p>
          </Animate>

          <Animate
            as={"hr"}
            className="my-4 border-default"
            initial={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.5 }}
            whileInView={{ width: "auto", opacity: 1 }}
          />

          <Animate>
            <h6 className="font-semibold">{cv.skills.label}</h6>
          </Animate>
          <Animate>
            <ul className="list-disc ml-5 mb-4">
              {cv.skills.items.map((skill, idx) => (
                <li key={idx}>
                  <Animate transition={{ delay: idx * 0.05 }}>{skill}</Animate>
                </li>
              ))}
            </ul>
          </Animate>

          <Animate
            as={"hr"}
            className="my-4 border-default"
            initial={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.5 }}
            whileInView={{ width: "auto", opacity: 1 }}
          />

          <Animate>
            <h6 className="font-semibold">Experience</h6>
            <ul className="list-disc ml-5 mb-4">
              {cv.experience.map((exp, idx) => (
                <li key={idx} className={idx > 0 ? "mt-2" : ""}>
                  <Animate transition={{ delay: idx * 0.1 }}>
                    <WorkDetails
                      className={"flex gap-1 items-center justify-center"}
                      company={exp.company}
                      details={exp.details}
                    >
                      <div className={" hover:text-primary transition"}>
                        <strong className={""}>{exp.company}</strong>
                      </div>
                      <Icon icon={"mynaui:click-solid"} />
                    </WorkDetails>
                  </Animate>
                  <Animate transition={{ delay: idx * 0.2 }}>
                    {exp.role}
                  </Animate>
                  <Animate transition={{ delay: idx * 0.3 }}>
                    {exp.duration}, {exp.location}
                  </Animate>
                </li>
              ))}
            </ul>
          </Animate>
          <Animate
            as={"hr"}
            className="my-4 border-default"
            initial={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
            whileInView={{ width: "auto", opacity: 1 }}
          />
          <Animate>
            <h6 className="font-semibold">Education</h6>
            <ul className="list-disc ml-5">
              {cv.education.map((edu, idx) => (
                <li key={idx}>
                  <Animate transition={{ delay: idx * 0.1 }}>
                    <strong>{edu.institution}</strong>
                  </Animate>
                  <Animate transition={{ delay: idx * 0.2 }}>
                    {edu.degree}
                  </Animate>
                  <Animate transition={{ delay: idx * 0.3 }}>
                    {edu.duration}
                  </Animate>
                </li>
              ))}
            </ul>
          </Animate>
        </div>
      </Animate>
    </div>
  );
}
