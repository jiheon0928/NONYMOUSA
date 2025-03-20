type Textcolor =
  | "#222222"
  | "#FFFFFF"
  | "#555555"
  | "#222222B3"
  | "#FF5C00"
  | "#0066CC"
  | "#D32F2F"
  | "#388E3C";
type TextColorType =
  | "basic_Black"
  | "basic_White"
  | "deep_Grey"
  | "light_Grey"
  | "highright_red"
  | "link_Blue"
  | "error_Red"
  | "success_Green";
export const TextColor: Record<TextColorType, Textcolor> = {
  basic_Black: "#222222",
  basic_White: "#FFFFFF",
  deep_Grey: "#555555",
  light_Grey: "#222222B3",
  highright_red: "#FF5C00",
  link_Blue: "#0066CC",
  error_Red: "#D32F2F",
  success_Green: "#388E3C",
};

type borderColor = "rgba(34,34,34,0.1)";
export const BorderColor: Record<"border", borderColor> = {
  border: "rgba(34,34,34,0.1)",
};

type backgroundColor = "rgba(34,34,34,0.03)";
export const BGColor: Record<"backgroundColor", backgroundColor> = {
  backgroundColor: "rgba(34,34,34,0.03)",
};
