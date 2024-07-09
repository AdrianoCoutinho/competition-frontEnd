/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { LoginUserType, NewClipType } from "../shared/types";
import NewUserType from "../shared/types/NewUser.type";
const apiUrl = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = apiUrl;

export interface ApiResponse {
  ok: boolean;
  data?: any;
  message: string;
  code?: number;
  msg?: string;
}

export const login = async (user: LoginUserType): Promise<ApiResponse> => {
  try {
    const result = await axios.post("/auth", user);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const register = async (user: NewUserType): Promise<ApiResponse> => {
  try {
    const newUser = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
    };
    const result = await axios.post("/register", newUser);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const createCompetition = async (data: any): Promise<ApiResponse> => {
  try {
    const newCompetition = {
      name: data.name,
      initialDate: data.initialDate,
      finalDate: data.finalDate,
      hashtag: data.hashtag,
      tiktok: data.tiktok,
      instagram: data.instagram,
      youtube: data.youtube,
      description: data.description,
      thumbnailDesktop: data.thumbnailDesktop,
      thumbnailPhone: data.thumbnailPhone,
    };

    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
        "Content-Type": "multipart/form-data",
      },
    };

    const result = await axios.post("/competition", newCompetition, config);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const setemphasiscompetition = async (
  competitionId: string
): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const result = await axios.post(
      `/competition/setEmphasisCompetition/${competitionId}`,
      {},
      config
    );
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const sendClipTiktok = async (
  data: NewClipType
): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const emphasisCompetition = await axios.get(
      "/competition/getEmphasisCompetition",
      config
    );

    const newCompetition = {
      url: data.url,
      type: data.platform,
      idCompetition: emphasisCompetition.data.data,
    };

    const result = await axios.post("/clip", newCompetition, config);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const validateTiktokUser = async (url: string): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const data = {
      url: url,
    };

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const result = await axios.post(
      "/validations/confirmvalidateTiktok",
      data,
      config
    );

    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const participate = async (
  idCompetition: string
): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const result = await axios.post(
      `/registration/${idCompetition}`,
      {},
      config
    );
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const Verifyparticipate = async (): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const result = await axios.get(`/registration`, config);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const getUser = async (): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const result = await axios.get(`/user`, config);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const listClipsOfUser = async (): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const result = await axios.get(`/clip/user`, config);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const listClipsTiktokOfUser = async (): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const result = await axios.get(`/clip/user/tiktok/total`, config);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const listClipsYoutubeOfUser = async (): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const result = await axios.get(`/clip/user/youtube/total`, config);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const listClipsInstagramOfUser = async (): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const result = await axios.get(`/clip/user/instagram/total`, config);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const listClipsOfCompetition = async (
  idCompetition: string
): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const body = {
      idCompetition: idCompetition,
    };

    const result = await axios.post(`/clip/competition`, body, config);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const VerifyTiktokStatus = async (): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const result = await axios.get(`/registration/tiktok`, config);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const getCodeTiktok = async (): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const result = await axios.get(`/validations/getcodetiktok`, config);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const getCompetition = async (
  competitionId: string
): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const result = await axios.get(`/competition/${competitionId}`, config);
    if (result.status === 200) {
      return {
        ok: true,
        code: 200,
        message: "Competição listada com sucesso!",
        data: result.data.data,
      };
    }
    return {
      ok: false,
      message: "erro ao buscar competição",
    };
  } catch (error) {
    return {
      ok: false,
      code: 500,
      message: "erro",
    };
  }
};

export const getEmphasisCompetition = async (): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const result = await axios.get(
      `/competition/getEmphasisCompetition`,
      config
    );
    if (result.status === 200) {
      return {
        ok: true,
        code: 200,
        message: "Competição destaque obtida sucesso!",
        data: result.data.data,
      };
    }
    return {
      ok: false,
      message: "erro ao buscar competição",
    };
  } catch (error) {
    return {
      ok: false,
      code: 500,
      message: "erro",
    };
  }
};

export const listCompetitions = async (): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const result = await axios.get(`/competition`, config);
    if (result.status === 200) {
      return {
        ok: true,
        code: 200,
        message: "Competições listadas com sucesso!",
        data: result.data.data,
      };
    }
    return {
      ok: false,
      message: "Erro ao buscar competições",
    };
  } catch (error) {
    return {
      ok: false,
      code: 500,
      message: "erro",
    };
  }
};

export const listDailies = async (): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const result = await axios.get(`/dailywin`, config);
    if (result.status === 200) {
      return {
        ok: true,
        code: 200,
        message: "DailiesWin listadas com sucesso!",
        data: result.data.data,
      };
    }
    return {
      ok: false,
      message: "Erro ao buscar competições",
    };
  } catch (error) {
    return {
      ok: false,
      code: 500,
      message: "erro",
    };
  }
};

export const getDaily = async (date: string): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const emphasisCompetition = await axios.get(
      "/competition/getEmphasisCompetition",
      config
    );

    const getDaily = {
      idCompetition: emphasisCompetition.data.data,
      date: date,
    };

    const result = await axios.post("/dailywin", getDaily, config);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const getAllViews = async (): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const emphasisCompetition = await axios.get(
      "/competition/getEmphasisCompetition",
      config
    );

    const getDaily = {
      idCompetition: emphasisCompetition.data.data,
    };

    const result = await axios.post("/clip/getAllViews", getDaily, config);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};
