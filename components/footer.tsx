import { Signature } from "@/components/Signature";

function Footer() {
  const current_year = new Date().getFullYear();

  return (
    <footer className="w-full flex items-center justify-between flex-wrap  py-3 px-3 min-h-[32.38px] border-t border-t-default">
      <Signature
        className={
          "data-[loaded=true]:opacity-100 opacity-0  transition-transform-opacity motion-reduce:transition-none"
        }
        width={70}
      />
      <p className={"text-sm"}>
        Copyright © {current_year}, Inc. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
