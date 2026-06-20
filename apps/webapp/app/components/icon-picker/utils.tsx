import * as LucideIcons from "lucide-react";

import { emojiData } from "./emoji-data";
import { cn } from "~/lib/utils";
import { Project } from "../icons/project";

export function getEmojiFromId(id: number) {
  return emojiData.find((em) => em.id === id);
}

export const getIcon = (
  icon?: string | null,
  size?: number,
  className?: string,
) => {
  if (icon) {
    try {
      const iconData = JSON.parse(icon);

      if (typeof iconData.icon === "string") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const IconComponent = (LucideIcons as any)[iconData.icon];

        if (IconComponent) {
          return (
            <IconComponent
              size={size}
              style={iconData?.color !== "#000" ? { color: iconData.color } : {}}
              className={cn("text-foreground shrink-0", className)}
            />
          );
        }
      }

      if (typeof iconData.emoji === "string") {
        return (
          <div
            className="flex shrink-0 items-center"
            style={{ fontSize: (size ?? 16) * 0.8 }}
          >
            {iconData.emoji}
          </div>
        );
      }
    } catch {
      // swallow parse errors
    }
  }

  return <Project size={size} className={cn("shrink-0", className)} />;
};
