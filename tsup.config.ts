import { defineConfig } from "tsup"

const tsupConfig = defineConfig({
  entry: ["app/mocks/index.ts"],
  clean: true,
  format: "esm"
})

// eslint-disable-next-line import/no-default-export
export default tsupConfig
