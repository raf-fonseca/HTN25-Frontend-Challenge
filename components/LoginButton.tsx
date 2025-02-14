"use client";

import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface LoginButtonProps {
  onClick: () => void;
}

export function LoginButton({ onClick }: LoginButtonProps) {
  const { isLoggedIn } = useAuth();

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      onClick={onClick}
    >
      <User className="h-4 w-4" />
      <span className="hidden sm:inline">
        {isLoggedIn ? "Log out" : "Log in"}
      </span>
    </Button>
  );
}

export default LoginButton;
