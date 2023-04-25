const baseURL = "https://8224-2a09-bac1-36e0-58-00-23-3f3.ngrok-free.app";

export const loginURL = baseURL+"/login";

export const loginURL_v2 = baseURL+"/login-timestamp";

export const allPatientsURL = baseURL+"/doctor/dashboard/get-reg-patients/";

export const requestsURL = baseURL+"/doctor/dashboard/requests/";

export const requestResponseURL = baseURL+"/doctor/dashboard/request-response/";

export const registerUser = baseURL+"/register/user";

export const getInitialSession = baseURL+"/user/get/session/0/week/0";

export const postInitialSessionResponse = baseURL+"/user/post/question-answers";

export const requestDoc = baseURL+"/user/request-doctor/";

export const getListOfDocs = baseURL+"/get/doctors";

export const getDoctorSuggestedArticle = baseURL+"/get/self-article/";

export const getPodcastDataURL = baseURL+"/user/get-all-podcast"

// export const getPodcastDataByArtistURL = baseURL+"/user/get-podcast-by-artist/"

export const getUserProfile = baseURL + "/user/get/profile/"

export const getWeekSession =  baseURL+"/user/get/session/";

export const getWeekAndSessionQuiz = baseURL+"/user/get/session/"; //0/week/0

export const postWeekAndSessionResponse = baseURL+"/user/post/question-answers";

export const getSessionsInAWeek = baseURL + "/user/get"; // {{patientId}}/full-week/{{weekNumber}}