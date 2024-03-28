import * as jose from "jose";
import type { EventSetupData } from "./Setup.vue";

// prevent users from hurting themselves by signing the exported configs
export class ExportSystem {
  private static readonly SECRET_TEXT =
    "3YUzMDiDJZtT4EgrHtCof4My6aSh1Vf6BsQtDH2h";
  private static readonly SECRET = new TextEncoder().encode(
    ExportSystem.SECRET_TEXT
  );
  private static readonly ALGO = "HS256";
  static async exportConfig(config: EventSetupData): Promise<string> {
    // @ts-expect-error it is unknown
    const result = await new jose.SignJWT(config)
      .setProtectedHeader({ alg: ExportSystem.ALGO })
      .sign(ExportSystem.SECRET);
    console.log("Created JWT", { config, result });

    return result;
  }
  static async importConfig(token: string): Promise<EventSetupData> {
    const { payload, protectedHeader } = await jose.jwtVerify(
      token,
      ExportSystem.SECRET,
      {}
    );
    console.log("Verified JWT", { payload, protectedHeader });
    // @ts-expect-error it is unknown
    return payload;
  }
}
