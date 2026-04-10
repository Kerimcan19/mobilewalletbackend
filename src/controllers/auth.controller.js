import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      message: "Kullanıcı oluşturuldu",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      message: "Giriş başarılı",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};