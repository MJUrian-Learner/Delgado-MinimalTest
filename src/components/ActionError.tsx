import React from "react";
import { cn } from "@/lib/utils";

type ActionErrorProps = {
  message: string;
  errors?: Record<string, unknown>;
} & React.ComponentPropsWithoutRef<"div">;

const ActionError = ({
  message,
  errors,
  className,
  ...props
}: ActionErrorProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center text-center text-sm xs:text-base lg:text-lg",
        className
      )}
      {...props}
    >
      {message && (
        <h2 className="text-destructive">{`${message} ${
          errors ? ":" : ""
        }`}</h2>
      )}

      {errors && (
        <span className="text-destructive">
          {Object.keys(errors).map((key) => (
            <p className="" key={key}>{` ${
              errors[key as keyof typeof errors]
            }`}</p>
          ))}
        </span>
      )}
    </div>
  );
};

export default ActionError;
