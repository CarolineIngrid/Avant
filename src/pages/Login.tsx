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

    // Login fake: usuário = admin, senha = 1234
    if (user === "admin" && pass === "1234") {
      const tokenFake = "token-abc-123";
      localStorage.setItem("auth_token", tokenFake);
      onLogin(tokenFake);
    } else {
      setErro("Usuário ou senha inválidos");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-20 p-6 border rounded"
    >
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {erro && <p className="text-red-600 mb-2">{erro}</p>}
      <input
        type="text"
        placeholder="Usuário"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Entrar
      </button>
    </form>
  );
}
