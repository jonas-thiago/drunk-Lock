const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const forgotPassword = document.getElementById("forgotPassword");
const botaoSair = document.getElementById("logoutButton");

// Lógica de Login (Mantida original)
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Pega os valores preenchidos no HTML
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginPassword").value;

    if (!email || !senha) {
      showToast("Preencha seu e-mail e senha.");
      return;
    }

    showToast("Autenticando...");

    fetch("https://rasping-confidant-late.ngrok-free.dev/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados.erro) {
          showToast("Atenção: " + dados.erro);
        } else {
          showToast(dados.mensagem);

          // Guarda os dados no navegador para a tela de perfil poder ler
          localStorage.setItem("usuarioLogado", JSON.stringify(dados.usuario));
          localStorage.setItem("tokenDrunkLock", dados.token);

          // Redireciona para o perfil após 1.5 segundos
          setTimeout(() => {
            window.location.href = "perfil.html";
          }, 1500);
        }
      })
      .catch((erro) => {
        console.error("Erro na requisição:", erro);
        showToast("Erro ao conectar com o servidor.");
      });
  });
}

// Lógica de Cadastro (Nova integração com o Node.js)
if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const cpf = document.getElementById("registerCpf").value;
    const telefone = document.getElementById("registerTelefone").value;
    const senha = document.getElementById("registerPassword").value;

    if (!nome || !email || !cpf || !telefone || !senha) {
      showToast("Preencha todos os campos do cadastro.");
      return;
    }

    const dadosFormulario = { nome, email, cpf, telefone, senha };

    showToast("Enviando dados...");

    fetch(
      "https://rasping-confidant-late.ngrok-free.dev/api/usuarios/cadastrar",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosFormulario),
      },
    )
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados.erro) {
          showToast("Atenção: " + dados.erro);
        } else {
          showToast(dados.mensagem);
          registerForm.reset();
        }
      })
      .catch((erro) => {
        console.error("Erro na requisição:", erro);
        showToast("Erro ao conectar com o servidor.");
      });
  });
}

// Lógica de Recuperar Senha
if (forgotPassword) {
  forgotPassword.addEventListener("click", (event) => {
    event.preventDefault();

    // Pega o e-mail que o usuário digitou no campo de login
    const email = document.getElementById("loginEmail").value;

    if (!email) {
      showToast(
        "Por favor, digite seu e-mail no campo acima para recuperar a senha.",
      );
      return;
    }

    showToast("Solicitando recuperação...");

    fetch(
      "https://rasping-confidant-late.ngrok-free.dev/api/usuarios/esqueci-senha",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      },
    )
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados.erro) {
          showToast("Atenção: " + dados.erro);
        } else {
          // Mostra a mensagem de sucesso que veio do back-end
          showToast(dados.mensagem);
        }
      })
      .catch((erro) => {
        console.error("Erro ao solicitar recuperação:", erro);
        showToast("Erro ao conectar com o servidor.");
      });
  });
}

// Função do Toast (Mantida original)
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = toast.querySelector("p");

  toastMessage.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// Animação do Header (Mantida original)
window.addEventListener("load", () => {
  const header = document.querySelector(".header");

  if (header) {
    setTimeout(() => {
      header.classList.add("scrolled");
    }, 0);
  }
});

if (botaoSair) {
  botaoSair.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("tokenDrunkLock");
    localStorage.removeItem("usuarioLogado");

    window.location.href = "login.html";
  });
}
