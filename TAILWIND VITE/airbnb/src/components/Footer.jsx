import LanguageButton from "./LanguageButton";
function Footer() {
  return (
    <footer className=" bg-white w-full flex justify-between items-center px-16 py-4">
      <div className="flex gap-2 text-sm font-normal">
        <p>© 2023 Airbnb, Inc.</p>
        <p>·</p>
        <p>Privacy</p>
        <p>·</p>
        <p>Terms</p>
        <p>·</p>
        <p>Sitemap</p>
        <p>·</p>
        <p>Company details</p>
      </div>
      <div className="flex gap-4 text-sm font-medium">
        <LanguageButton />
        <p>English(IN)</p>
        <p>₹ INR</p>
        <p>Support & resources</p>
      </div>
    </footer>
  );
}

export default Footer;
