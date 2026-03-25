import { isCancel, cancel, confirm } from "@clack/prompts";
import color from "picocolors";

export async function setLanguage(_cliResults) {
  const shouldUseTypescript = await confirm({
    message: "Would you like to use TypeScript with this project?",
    initialValue: true,
  });
  if (isCancel(shouldUseTypescript)) {
    cancel("Cancelled... 👋");
    return process.exit(0);
  }
  if (shouldUseTypescript) {
    console.log(color.green("Good call, now using TypeScript! 🚀"));
  } else {
    console.log(color.green(`Wrong answer, we're gonna use Typescript.`));
  }
}
