import Link from "next/link";
import psiboard from "@/public/psiboard.png";
import onboarding from "@/public/psiboard_onboarding.png";

export default function Home() {
  return (
    <>
      <main>
        <nav className="sm:flex flex sm:flex-row flex-col justify-between items-center py-4 px-8 sm:mb-0 mb-10 text-white">
          <div className="flex items-center">
            <img
              src={psiboard.src}
              alt="Logo"
              className="h-14 w-auto cursor-pointer mb-5"
            />
          </div>

          <div className="sm:flex items-center space-x-4">
            <button
              className="px-4 py-1 bg-[#132742] text-[#fff] font-semibold rounded"
              data-testid="button-onboarding"
            >
              <Link href="/login">Fazer Login</Link>
            </button>
            <button
              className="px-4 py-1 bg-[#132742] text-[#fff] font-semibold rounded"
              data-testid="button-onboarding"
            >
              <Link href="/register">Cadastre-se</Link>
            </button>
          </div>
        </nav>
        <div className="flex sm:justify-between flex-col sm:flex-row text-center sm:text-start  items-center sm:pr-0 sm:pl-8 px-5 pt-0 w-full">
        <div className="sm:w-[50%] sm:mt-0 mt-5 justify-start">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="font-bold tracking-tight text-5xl text-center sm:text-start">
              Clinicboard, é praticidade
            </h2>
            <p className="mt-6 text-lg leading-8">
              Centralize os atendimentos do consultório em um só lugar e tenha o
              controle com acesso fácil, simples e objetivo.
            </p>
          </div>
          <button className="px-4 py-2 mt-4 bg-[#132742] text-[#fff] font-semibold rounded">
            <a href="#about">Sobre nós</a>
          </button>
        </div>

        <div className="w-[50%] justify-end bg-cover bg-center flex">
          <img
            src={onboarding.src}
            alt="onboardingImage"
            className="sm:flex hidden h-[600px] w-auto object-contain justify-end"
          />
        </div>
      </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </>
  );
}
