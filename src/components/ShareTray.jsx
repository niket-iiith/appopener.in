import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Trophy, Star, Crown, Gift, Gamepad, X } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import ShareButtons from "../components/share/ShareAction";
import RewardsList from "../components/share/RewardsList";
import LevelProgress from "../components/share/LevelProgress";
import { Button } from "../components/ui/button";
import closeBtn from "../assets/close.webp";
import StoryModal from "./StoryModal.jsx";

const challenges = [
  { shares: 5, title: "Bronze Sharer", icon: Trophy },
  { shares: 15, title: "Silver Influencer", icon: Star },
  { shares: 30, title: "Gold Ambassador", icon: Crown },
  { shares: 50, title: "Diamond Creator", icon: Gift },
  { shares: 100, title: "Reward = Free Domain", icon: Gamepad },
];

const ShareTray = ({ open, onOpenChange }) => {
  const [shares, setShares] = useState(0);
  const [level, setLevel] = useState(1);
  const [storyModalOpen, setStoryModalOpen] = useState(false);

  const handleShare = (platform) => {
    setShares((prev) => prev + 1);
    if (shares + 1 >= level * 5) {
      setLevel((prev) => prev + 1);
      showConfetti();
      toast.success(`🎉 Level up! You're now level ${level + 1}`);
    }
    toast.success("Thanks for sharing! +1 share point");
  };

  const showConfetti = () => {
    const colors = ["#FFD700", "#FF69B4", "#4CAF50", "#00BCD4"];
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.pointerEvents = "none";
    container.style.zIndex = "9999";
    document.body.appendChild(container);

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.style.position = "absolute";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = "-10px";
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      container.appendChild(confetti);

      const animation = confetti.animate(
        [
          { transform: `translate(0, 0) rotate(0)` },
          {
            transform: `translate(${Math.random() * 200 - 100}px, ${
              window.innerHeight + 10
            }px) rotate(${Math.random() * 720}deg)`,
          },
        ],
        {
          duration: Math.random() * 1000 + 1000,
          easing: "cubic-bezier(.37,0,.63,1)",
        }
      );

      animation.onfinish = () => confetti.remove();
    }

    setTimeout(() => container.remove(), 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="mt-5 pb-[25%] sm:max-w-md bg-gradient-to-br from-gray-900 to-slate-900 max-h-[95vh] overflow-y-auto">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="flex items-center gap-2 text-white">
            <Trophy className="h-5 w-5 text-yellow-400 animate-bounce" />
            Share & Earn Rewards
            <button
              onClick={() => onOpenChange(false)}
              className="text-white hover:text-gray-300"
            >
              <img
                className="z-10 flex absolute top-2 right-2 w-10"
                src={closeBtn}
                alt=""
              />
            </button>
          </DialogTitle>
          {/* Close Button */}
        </DialogHeader>

        <div className="space-y-6">
          <LevelProgress level={level} shares={shares} />
          <ShareButtons
            onShare={handleShare}
            onSetStoryOpen={setStoryModalOpen}
          />

          <Button
            onClick={() =>
              window.open("https://www.loginskip.com/auth/signin", "_blank")
            }
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
          >
            Complete Tasks to Earn More Points
          </Button>

          <RewardsList shares={shares} challenges={challenges} />
          <StoryModal
            isOpen={storyModalOpen}
            onClose={() => setStoryModalOpen(false)}
            link={window.location.href}
            shortId={window.location.href.split("/").pop()}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareTray;
