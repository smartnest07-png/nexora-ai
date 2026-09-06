// ========================================
// NEXORA AI - COMPLETE SCRIPT
// ========================================


// ========================================
// AUTH ELEMENTS
// ========================================

const authPage = document.getElementById("authPage");
const appPage = document.getElementById("appPage");

const authTitle = document.getElementById("authTitle");
const authSubtitle = document.getElementById("authSubtitle");

const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

const authBtn = document.getElementById("authBtn");
const switchBtn = document.getElementById("switchBtn");
const switchText = document.getElementById("switchText");
const showPassword = document.getElementById("showPassword");

const logoutBtn = document.getElementById("logoutBtn");
const userName = document.getElementById("userName");


// ========================================
// CHAT ELEMENTS
// ========================================

const chat = document.getElementById("chat");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");

const newChatBtn = document.getElementById("newChatBtn");
const clearChatBtn = document.getElementById("clearChatBtn");


// ========================================
// SIDEBAR ELEMENTS
// ========================================

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

const menuBtn = document.getElementById("menuBtn");
const closeSidebar = document.getElementById("closeSidebar");

const sidebarNewChat = document.getElementById("sidebarNewChat");
const historyList = document.getElementById("historyList");


// ========================================
// FILE ELEMENTS
// ========================================

const fileInput = document.getElementById("fileInput");
const fileBtn = document.getElementById("fileBtn");

const filePreview = document.getElementById("filePreview");
const fileName = document.getElementById("fileName");
const fileIcon = document.getElementById("fileIcon");

const removeFileBtn = document.getElementById("removeFileBtn");

const imagePreviewContainer =
  document.getElementById("imagePreviewContainer");

const imagePreview =
  document.getElementById("imagePreview");


// ========================================
// MODALS
// ========================================

const profileBtn = document.getElementById("profileBtn");
const settingsBtn = document.getElementById("settingsBtn");

const profileModal = document.getElementById("profileModal");
const settingsModal = document.getElementById("settingsModal");

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");

const themeBtn = document.getElementById("themeBtn");
const settingsThemeBtn = document.getElementById("settingsThemeBtn");

const deleteHistoryBtn =
  document.getElementById("deleteHistoryBtn");


// ========================================
// VARIABLES
// ========================================

let isSignup = false;
let currentChat = [];
let selectedFile = null;


// ========================================
// CHECK LOGIN
// ========================================

function checkLogin() {

  const savedUser =
    localStorage.getItem("smartnestUser");

  if (savedUser) {

    try {

      const user = JSON.parse(savedUser);

      openApp(user.name);

    } catch (error) {

      localStorage.removeItem(
        "smartnestUser"
      );
    }
  }
}


// ========================================
// SWITCH LOGIN / SIGNUP
// ========================================

switchBtn.addEventListener("click", () => {

  isSignup = !isSignup;

  if (isSignup) {

    authPage.classList.add("signup-mode");

    authTitle.textContent =
      "Create Account";

    authSubtitle.textContent =
      "Join NEXORA AI today";

    authBtn.textContent =
      "Sign Up";

    switchText.textContent =
      "Already have an account?";

    switchBtn.textContent =
      "Login";

  } else {

    authPage.classList.remove("signup-mode");

    authTitle.textContent =
      "Welcome Back!";

    authSubtitle.textContent =
      "Login to continue to NEXORA AI";

    authBtn.textContent =
      "Login";

    switchText.textContent =
      "Don't have an account?";

    switchBtn.textContent =
      "Sign Up";
  }

});


// ========================================
// SHOW PASSWORD
// ========================================

showPassword.addEventListener("click", () => {

  if (passwordInput.type === "password") {

    passwordInput.type = "text";
    showPassword.textContent = "🙈";

  } else {

    passwordInput.type = "password";
    showPassword.textContent = "👁️";
  }

});


// ========================================
// LOGIN / SIGNUP
// ========================================

authBtn.addEventListener("click", () => {

  const name =
    nameInput.value.trim();

  const email =
    emailInput.value.trim();

  const password =
    passwordInput.value.trim();


  // SIGNUP
  if (isSignup) {

    if (!name || !email || !password) {

      alert(
        "Please fill all fields!"
      );

      return;
    }


    const user = {
      name: name,
      email: email,
      password: password
    };


    localStorage.setItem(
      "smartnestAccount",
      JSON.stringify(user)
    );


    localStorage.setItem(
      "smartnestUser",
      JSON.stringify(user)
    );


    openApp(name);

  }


  // LOGIN
  else {

    if (!email || !password) {

      alert(
        "Please enter email and password!"
      );

      return;
    }


    const account =
      localStorage.getItem(
        "smartnestAccount"
      );


    if (!account) {

      alert(
        "Account not found. Please Sign Up first!"
      );

      return;
    }


    const savedUser =
      JSON.parse(account);


    if (
      savedUser.email === email &&
      savedUser.password === password
    ) {

      localStorage.setItem(
        "smartnestUser",
        JSON.stringify(savedUser)
      );

      openApp(savedUser.name);

    } else {

      alert(
        "Incorrect email or password!"
      );
    }

  }

});


// ========================================
// OPEN APP
// ========================================

function openApp(name) {

  authPage.style.display = "none";

  appPage.style.display = "block";

  userName.textContent = name;

  loadHistory();

}


// ========================================
// LOGOUT
// ========================================

logoutBtn.addEventListener("click", () => {

  localStorage.removeItem(
    "smartnestUser"
  );

  appPage.style.display = "none";

  authPage.style.display = "flex";

  emailInput.value = "";

  passwordInput.value = "";

  closeSidebarMenu();

});


// ========================================
// SIDEBAR
// ========================================

function openSidebarMenu() {

  sidebar.classList.add("active");

  overlay.classList.add("active");

}


function closeSidebarMenu() {

  sidebar.classList.remove("active");

  overlay.classList.remove("active");

}


menuBtn.addEventListener(
  "click",
  openSidebarMenu
);


closeSidebar.addEventListener(
  "click",
  closeSidebarMenu
);


overlay.addEventListener(
  "click",
  closeSidebarMenu
);


// ========================================
// NEW CHAT
// ========================================

function createNewChat() {

  currentChat = [];

  const user =
    JSON.parse(
      localStorage.getItem(
        "smartnestUser"
      ) || "{}"
    );

  const name =
    user.name || "User";


  chat.innerHTML = `

    <div class="welcome">

      <div class="big-logo">
        🤖
      </div>

      <h1>
        Hello,
        <span>${name}</span>
        👋
      </h1>

      <p>
        How can NEXORA AI help you today?
      </p>

    </div>

  `;


  closeSidebarMenu();

}


newChatBtn.addEventListener(
  "click",
  createNewChat
);


sidebarNewChat.addEventListener(
  "click",
  createNewChat
);


clearChatBtn.addEventListener(
  "click",
  () => {

    if (
      confirm(
        "Clear current chat?"
      )
    ) {

      createNewChat();
    }

  }
);


// ========================================
// FILE UPLOAD
// ========================================

fileBtn.addEventListener(
  "click",
  () => {

    fileInput.click();

  }
);


fileInput.addEventListener(
  "change",
  () => {

    if (
      !fileInput.files.length
    ) return;


    selectedFile =
      fileInput.files[0];


    filePreview.style.display =
      "flex";


    fileName.textContent =
      selectedFile.name;


    if (
      selectedFile.type.startsWith(
        "image/"
      )
    ) {

      fileIcon.textContent =
        "🖼️";


      const reader =
        new FileReader();


      reader.onload =
        (event) => {

          imagePreview.src =
            event.target.result;


          imagePreviewContainer.style.display =
            "block";

        };


      reader.readAsDataURL(
        selectedFile
      );

    }

    else {

      fileIcon.textContent =
        "📎";


      imagePreviewContainer.style.display =
        "none";
    }

  }
);


// REMOVE FILE

removeFileBtn.addEventListener(
  "click",
  () => {

    selectedFile = null;

    fileInput.value = "";

    filePreview.style.display =
      "none";

    imagePreviewContainer.style.display =
      "none";

    imagePreview.src = "";

  }
);


// ========================================
// SEND MESSAGE - REAL GEMINI AI
// ========================================

async function sendMessage() {

  const message =
    userInput.value.trim();


  if (
    !message &&
    !selectedFile
  ) return;


  const welcome =
    document.querySelector(
      ".welcome"
    );


  if (welcome) {
    welcome.remove();
  }


  // FILE MESSAGE
  if (selectedFile) {

    addMessage(
      `📎 ${selectedFile.name}`,
      "user"
    );


    currentChat.push({
      text: `📎 ${selectedFile.name}`,
      sender: "user"
    });


    selectedFile = null;

    fileInput.value = "";

    filePreview.style.display =
      "none";

    imagePreviewContainer.style.display =
      "none";

  }


  // USER MESSAGE
  if (message) {

    addMessage(
      message,
      "user"
    );


    currentChat.push({
      text: message,
      sender: "user"
    });


    userInput.value = "";

  }


  showTyping();


  try {

    // CONNECT TO GEMINI BACKEND

    const response =
      await fetch(
        "http://localhost:3000/api/chat",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify({
              message: message
            })

        }
      );


    const data =
      await response.json();


    removeTyping();


    if (!response.ok) {

      throw new Error(
        data.error ||
        "AI response failed"
      );

    }


    const reply =
      data.reply;


    addMessage(
      reply,
      "ai"
    );


    currentChat.push({
      text: reply,
      sender: "ai"
    });


    saveCurrentChat();


  } catch (error) {

    console.error(
      "AI Error:",
      error
    );


    removeTyping();


    addMessage(
      "⚠️ NEXORA AI is currently unavailable. Please make sure the server is running.",
      "ai"
    );

  }

}


// ========================================
// ADD MESSAGE
// ========================================

function addMessage(
  text,
  sender
) {

  const messageDiv =
    document.createElement(
      "div"
    );


  messageDiv.className =
    `message ${sender}`;


  const content =
    document.createElement(
      "div"
    );


  content.className =
    "message-content";


  content.textContent =
    text;


  messageDiv.appendChild(
    content
  );


  // MESSAGE TIME

  const time =
    document.createElement(
      "div"
    );


  time.className =
    "message-time";


  const now =
    new Date();


  time.textContent =
    now.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    );


  messageDiv.appendChild(
    time
  );


  chat.appendChild(
    messageDiv
  );


  chat.scrollTop =
    chat.scrollHeight;

}


// ========================================
// TYPING ANIMATION
// ========================================

function showTyping() {

  const typing =
    document.createElement(
      "div"
    );


  typing.className =
    "message ai";


  typing.id =
    "typing";


  typing.innerHTML = `

    <div class="message-content">
      🤖 NEXORA AI is thinking...
    </div>

  `;


  chat.appendChild(
    typing
  );


  chat.scrollTop =
    chat.scrollHeight;

}


function removeTyping() {

  const typing =
    document.getElementById(
      "typing"
    );


  if (typing) {

    typing.remove();

  }

}


// ========================================
// SAVE CHAT HISTORY
// ========================================

function saveCurrentChat() {

  if (
    currentChat.length === 0
  ) return;


  let history =
    JSON.parse(
      localStorage.getItem(
        "smartnestHistory"
      ) || "[]"
    );


  const title =
    currentChat[0]
      .text
      .substring(
        0,
        30
      );


  const chatData = {

    id: Date.now(),

    title: title,

    messages: currentChat

  };


  history.unshift(
    chatData
  );


  // Keep only latest 20 chats

  if (
    history.length > 20
  ) {

    history =
      history.slice(
        0,
        20
      );

  }


  localStorage.setItem(
    "smartnestHistory",
    JSON.stringify(history)
  );


  loadHistory();

}


// ========================================
// LOAD HISTORY
// ========================================

function loadHistory() {

  const history =
    JSON.parse(
      localStorage.getItem(
        "smartnestHistory"
      ) || "[]"
    );


  historyList.innerHTML = "";


  if (
    history.length === 0
  ) {

    historyList.innerHTML = `
      <p class="empty-history">
        No chats yet
      </p>
    `;

    return;
  }


  history.forEach(
    item => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "history-item";


      button.textContent =
        "💬 " +
        item.title;


      button.addEventListener(
        "click",
        () => {

          chat.innerHTML = "";


          currentChat =
            item.messages;


          item.messages.forEach(
            msg => {

              addMessage(
                msg.text,
                msg.sender
              );

            }
          );


          closeSidebarMenu();

        }
      );


      historyList.appendChild(
        button
      );

    }
  );

}


// ========================================
// PROFILE
// ========================================

profileBtn.addEventListener(
  "click",
  () => {

    const user =
      JSON.parse(
        localStorage.getItem(
          "smartnestUser"
        ) || "{}"
      );


    profileName.textContent =
      user.name ||
      "User";


    profileEmail.textContent =
      user.email ||
      "";


    profileModal.classList.add(
      "active"
    );


    closeSidebarMenu();

  }
);


// ========================================
// SETTINGS
// ========================================

settingsBtn.addEventListener(
  "click",
  () => {

    settingsModal.classList.add(
      "active"
    );


    closeSidebarMenu();

  }
);


// DELETE HISTORY

deleteHistoryBtn.addEventListener(
  "click",
  () => {

    if (
      confirm(
        "Delete all chat history?"
      )
    ) {

      localStorage.removeItem(
        "smartnestHistory"
      );


      currentChat = [];


      loadHistory();


      settingsModal.classList.remove(
        "active"
      );

    }

  }
);


// ========================================
// CLOSE MODALS
// ========================================

document
  .querySelectorAll(
    ".modal-close"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const modal =
            document.getElementById(
              button.dataset.close
            );


          if (modal) {

            modal.classList.remove(
              "active"
            );

          }

        }
      );

    }
  );


// ========================================
// THEME
// ========================================

function toggleTheme() {

  document.body.classList.toggle(
    "light"
  );


  const isLight =
    document.body.classList.contains(
      "light"
    );


  themeBtn.textContent =
    isLight ?
    "☀️" :
    "🌙";


  settingsThemeBtn.textContent =
    isLight ?
    "☀️" :
    "🌙";


  localStorage.setItem(
    "smartnestTheme",
    isLight ?
    "light" :
    "dark"
  );

}


themeBtn.addEventListener(
  "click",
  toggleTheme
);


settingsThemeBtn.addEventListener(
  "click",
  toggleTheme
);


// LOAD SAVED THEME

if (
  localStorage.getItem(
    "smartnestTheme"
  ) === "light"
) {

  document.body.classList.add(
    "light"
  );


  themeBtn.textContent =
    "☀️";


  settingsThemeBtn.textContent =
    "☀️";

}


// ========================================
// SEND EVENTS
// ========================================

sendBtn.addEventListener(
  "click",
  sendMessage
);


userInput.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendMessage();

    }

  }
);


// ========================================
// VOICE INPUT
// ========================================

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;


if (SpeechRecognition) {

  const recognition =
    new SpeechRecognition();


  recognition.lang =
    "en-US";


  recognition.interimResults =
    false;


  voiceBtn.addEventListener(
    "click",
    () => {

      recognition.start();

    }
  );


  recognition.onresult =
    event => {

      userInput.value =
        event.results[0][0]
          .transcript;

    };


  recognition.onerror =
    () => {

      alert(
        "Voice recognition failed. Please try again."
      );

    };

} else {

  voiceBtn.addEventListener(
    "click",
    () => {

      alert(
        "Voice input is not supported in this browser."
      );

    }
  );

}


// ========================================
// START APP
// ========================================

checkLogin();