import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

const User = () => {
  return (
    <div className="w-full">
      <section className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
            <h1 className="uppercase font-bold text-[20px]">Dashboard</h1>
          </div>
        </div>
        <div className="flex items-center"></div>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="#1B62D6" />
          </InputLeftElement>
          <Input
            id="search"
            type="search"
            variant={"filled"}
            // value={values.email}
            // onChange={handleChange}
            // onBlur={handleBlur}
            placeholder="Ketik sesuatu..."
            border={"1px solid #1B62D6"}
            _hover={{
              border: "1px solid #3B82F6",
            }}
          />
        </InputGroup>
      </section>

      <section></section>
    </div>
  );
};

export default User;
