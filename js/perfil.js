
// 1. Verifica se existe usuário salvo no navegador
const usuarioStorage = localStorage.getItem("usuarioLogado");

if (!usuarioStorage) {
    // Se não estiver logado, chuta de volta pro login!
    alert("Acesso não autorizado! Faça o login primeiro.");
    window.location.href = "login.html";
} else {

    const usuario = JSON.parse(usuarioStorage);

    // 2. Preenche os dados na tela
    document.getElementById("userName").textContent = usuario.nome;
    document.getElementById("userEmail").textContent = usuario.email;
    document.getElementById("userAvatar").textContent = usuario.nome.charAt(0).toUpperCase();
}

// 3. Função de Logout
document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado"); // Limpa os dados da tela
    localStorage.removeItem("tokenDrunkLock"); // IMPORTANTE: Limpa o token JWT
            
    window.location.href = "login.html"; // Redireciona para o login
});
    
