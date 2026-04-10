import "dotenv/config";

const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET"];

const getMissingEnvVars = () =>
  requiredEnvVars.filter((envName) => !process.env[envName]);

const missingEnvVars = getMissingEnvVars();

if (missingEnvVars.length > 0) {
  const missingList = missingEnvVars.join(", ");
  throw new Error(
    `Eksik environment variable: ${missingList}. Deploy ortaminda bu degerleri provider panelinden tanimlaman gerekiyor.`
  );
}

export const getJwtSecret = () => process.env.JWT_SECRET;