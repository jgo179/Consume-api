import Image from "next/image";

export function Footer() {
  return (
    <footer className="flex flex-row bottom-0 text-gray-600 w-full justify-center p-5">
      <p className="flex flex-row items-center text-sm">
        <a
          href="https://github.com/jgo179"
          rel="noopener noreferrer"
          target="_blank"
          className="inline-flex mr-1"
        >
          <Image
            src="github-icon-white.svg"
            alt="github icon"
            className="mr-1 "
            width={20}
            height={20}
          />{" "}
          Jonathan Oliveira 2026.
        </a>
        Todos os direitos reservados.
      </p>
    </footer>
  );
}
