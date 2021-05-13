function getCookie(name) {
  const cookieValue =
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";
  try {
    return decodeURIComponent(cookieValue);
  } catch {
    return cookieValue;
  }
}

async function parse(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function request(endpoint, options = {}) {
  const response = await fetch(process.env.REACT_APP_API_URL + endpoint, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      "X-CSRF-Token": getCookie("CSRF-TOKEN"),
    },
  });
  const data = await parse(response);
  if (response.ok) {
    return data;
  } else {
    throw data;
  }
}

function autologin() {
  return request("/me");
}

function login(formData) {
  return request("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}

function signup(formData) {
  return request("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}

function logout() {
  return request("/logout", {
    method: "DELETE",
  });
}

function updateUser(formData) {
  return request("/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}

export { autologin, login, signup, logout, updateUser };
