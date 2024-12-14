import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { subtitle, title } from "@/components/primitives";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import LayoutAnimation from "@/components/LayoutAnimation";

export default function Home() {
  return (
    <section className={"h-full"}>
      <LayoutAnimation className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
        <div className="inline-block max-w-xl text-center justify-center">
          {/*Hi there! Let’s build something extraordinary together.*/}
          <span className={title()}>Hi there!&nbsp;</span>
          <span className={title()}>Let&#39;s build&nbsp;</span>
          <br />
          <span className={title()}>something extraordinary&nbsp;</span>
          <span className={title({ color: "yellow" })}>together.</span>
          <div className={subtitle({ class: "mt-4" })}>
            Crafting Modern Web Solutions, One Line of Code at a Time.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              radius: "full",
              variant: "shadow",
              class: "text-white bg-linkedin",
            })}
            href={siteConfig.links.docs}
          >
            <LinkedinIcon />
            Linkedin
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>
      </LayoutAnimation>
    </section>
  );
}
