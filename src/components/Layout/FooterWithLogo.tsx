const date = new Date();
const year = date.getFullYear();

export default function FooterWithLogo() {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>
          Copyright © {year} - All right reserved by Watch That - Made by{" "}
          <a
            className="text-[#1FB2A6]"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/MassimoTascone"
          >
            Massimo Tascone
          </a>
        </p>
      </div>
    </footer>
  );
}
