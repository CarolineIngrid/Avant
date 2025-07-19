import { useState } from "react";

type LoginProps = {
  onLogin: (token: string) => void;
};

export default function Login({ onLogin }: LoginProps) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (user === "admin" && pass === "1234") {
      const tokenFake = "token-abc-123";
      localStorage.setItem("auth_token", tokenFake);
      onLogin(tokenFake);
    } else {
      setErro("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#eceaea] text-white">
      {/* Lado da imagem */}
      <div className="hidden md:flex flex-col justify-center items-center bg-[#7534b1] w-1/2 p-8 rounded-r-3xl shadow-lg">
        <img
          src="/car.svg"
          alt="Carrinho 3D"
          className="max-w-xs drop-shadow-lg"
        />
      </div>

      {/* Lado do formulário */}
      <div className="flex flex-col justify-center w-full md:w-1/2 p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-[#8b8b8b] p-10 rounded-3xl shadow-lg max-w-md mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
          {erro && <p className="text-red-500 mb-4 text-center">{erro}</p>}

          <input
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full p-3 mb-6 rounded-lg bg-[#5a5a5a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3a74f8]"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full p-3 mb-8 rounded-lg bg-[#5a5a5a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3a74f8]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#5a5a5a] py-3 rounded-lg font-semibold hover:bg-[#D39398] transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
