import { Dayjs } from "dayjs";
import { ChatCompletionSystemMessageParam } from "openai/resources";
import { AggregateRoot } from "~/src/shared/core/domain/AggregateRoot";
import { Result } from "~/src/shared/core/domain/Result";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { CounselorInfo, CounselorType } from "~/src/shared/enums/CounselorType.enum";
import { CounselPrompt } from "~/src/shared/enums/CounselPrompt.enum";
import { getNowDayjs } from "~/src/shared/utils/Date.utils";

interface CounselPromptsNewProps {
  persona: string | null;
  context: string | null;
  instruction: string | null;
  tone: string | null;
  additionalPrompt: string | null;
  promptType: CounselPrompt;
  description: string | null;
  version: string | null;
}

interface CounselPromptsProps extends CounselPromptsNewProps {
  createdAt: Dayjs;
  updatedAt: Dayjs;
  deletedAt: Dayjs | null;
}

export class CounselPrompts extends AggregateRoot<CounselPromptsProps> {
  private constructor(props: CounselPromptsProps, id: UniqueEntityId) {
    super(props, id);
  }

  public static create(props: CounselPromptsProps, id: UniqueEntityId): Result<CounselPrompts> {
    const counsels = new CounselPrompts(props, id);
    const validateResult = counsels.validateDomain();
    if (validateResult.isFailure) {
      return Result.fail<CounselPrompts>(validateResult.error);
    }
    return Result.ok<CounselPrompts>(counsels);
  }

  public static createNew(newProps: CounselPromptsNewProps): Result<CounselPrompts> {
    const now = getNowDayjs();
    const newId = new UniqueEntityId();
    const version = newProps.version || "1.0";
    return this.create(
      {
        ...newProps,
        version,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      },
      newId,
    );
  }

  validateDomain(): Result<void> {
    // persona 검증
    // if (!this.props.persona) {
    //   return Result.fail<void>("[CounselPrompts] persona는 필수입니다");
    // }

    // context 검증
    // if (!this.props.context) {
    //   return Result.fail<void>("[CounselPrompts] context는 필수입니다");
    // }

    // instruction 검증
    // if (!this.props.instruction) {
    //   return Result.fail<void>("[CounselPrompts] instruction은 필수입니다");
    // }

    // tone 검증
    // if (!this.props.tone) {
    //   return Result.fail<void>("[CounselPrompts] tone은 필수입니다");
    // }

    // promptType 검증
    if (this.props.promptType === null || this.props.promptType === undefined) {
      return Result.fail<void>("[CounselPrompts] promptType은 필수입니다");
    }
    if (!Object.values(CounselPrompt).includes(this.props.promptType)) {
      return Result.fail<void>("[CounselPrompts] 유효하지 않은 promptType입니다");
    }

    // version 검증
    if (!this.props.version) {
      return Result.fail<void>("[CounselPrompts] version은 필수입니다");
    }

    // 날짜 검증
    if (!this.props.createdAt) {
      return Result.fail<void>("[CounselPrompts] 생성 시간은 필수입니다");
    }
    if (!this.props.updatedAt) {
      return Result.fail<void>("[CounselPrompts] 수정 시간은 필수입니다");
    }

    return Result.ok<void>();
  }

  // Getters
  get persona(): string {
    return this.props.persona;
  }

  get context(): string {
    return this.props.context;
  }

  get instruction(): string {
    return this.props.instruction;
  }

  get tone(): string {
    return this.props.tone;
  }

  get additionalPrompt(): string {
    return this.props.additionalPrompt;
  }

  get promptType(): CounselPrompt {
    return this.props.promptType;
  }

  get description(): string {
    return this.props.description;
  }

  get version(): string {
    return this.props.version;
  }

  get createdAt(): Dayjs {
    return this.props.createdAt;
  }

  get updatedAt(): Dayjs {
    return this.props.updatedAt;
  }

  get deletedAt(): Dayjs | null {
    return this.props.deletedAt;
  }

  // Methods
  public delete(): void {
    this.props.deletedAt = getNowDayjs();
  }

  public restore(): void {
    this.props.deletedAt = null;
  }

  public makePrompt(counselorType: CounselorType): ChatCompletionSystemMessageParam {
    const { name, gender } = CounselorInfo[counselorType];
    let content: string = "";
    if (this.persona) {
      content += `
<Persona>
  ${this.persona}

      `;
    }
    if (this.context) {
      content += `
<Context>
  ${this.context}

      `;
    }
    if (this.instruction) {
      content += `
<Instruction>
  ${this.instruction}

      `;
    }
    if (this.tone) {
      content += `
<Tone>
  ${this.tone}

      `;
    }
    if (this.additionalPrompt) {
      content += `
${this.additionalPrompt}

      `;
    }

    return {
      role: "system",
      content: content.replace("{name}", name).replace("{gender}", gender),
    };
  }
}
