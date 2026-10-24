import {
  Briefcase,
  Code2,
  Cpu,
  Gamepad2,
  Lightbulb,
  Radio,
  Video,
  type LucideIcon,
} from "lucide-react";
import {
  siDiscord,
  siGithub,
  siInstagram,
  siKick,
  siRumble,
  siTiktok,
  siTwitch,
  siYoutube,
} from "simple-icons";

const platformIcons = {
  instagram: siInstagram,
  kick: siKick,
  youtube: siYoutube,
  twitch: siTwitch,
  tiktok: siTiktok,
  github: siGithub,
  discord: siDiscord,
  rumble: siRumble,
};

const specialtyIcons: Record<string, LucideIcon> = {
  video: Video,
  technology: Cpu,
  development: Code2,
  games: Gamepad2,
  ideas: Lightbulb,
  digital: Briefcase,
};

export function PlatformIcon({ platformId }: { platformId: string }) {
  const brand = platformIcons[platformId as keyof typeof platformIcons];
  if (brand) {
    return (
      <svg
        className="identity-icon platform-brand-icon"
        data-platform-logo={platformId}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={brand.path} />
      </svg>
    );
  }

  const Icon = Radio;
  return <Icon className="identity-icon" aria-hidden="true" strokeWidth={1.7} />;
}

export function SpecialtyIcon({ icon }: { icon: string }) {
  const Icon = specialtyIcons[icon] ?? Code2;
  return <Icon className="identity-icon" aria-hidden="true" strokeWidth={1.7} />;
}
