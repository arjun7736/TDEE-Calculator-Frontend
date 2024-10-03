"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import axios from "../axios/axiosIntersepter";

export const Login = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async () => {
    await axios
      .post("/auth/login", { email, password })
      .then((data) => {
        localStorage.setItem("token", data.data.token);
        if (data.data.user.isAdmin) {
          router.push("/admin");
          toast.success("Login Successful");
        } else {
          router.push("/user");
          toast.success("Login Successful");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error.message);
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Tabs fullWidth aria-label="Options" className="pt-2 px-2">
                <Tab key="login" title="Login">
                  <ModalHeader className="flex flex-col gap-1">
                    Log in
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      variant="bordered"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="flex px-1 justify-between">
                      <Link color="primary" href="#" size="sm">
                        Reset password?
                      </Link>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      onClick={onClose}
                      onPress={handleSubmit}
                    >
                      Login
                    </Button>
                  </ModalFooter>
                </Tab>
                <Tab key="signup" title="Register">
                  <ModalHeader className="flex flex-col gap-1">
                    Register
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      variant="bordered"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Register
                    </Button>
                  </ModalFooter>
                </Tab>
              </Tabs>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
