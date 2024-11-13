export enum CounselStage {
  SMALL_TALK = 0, //스몰토크, 컨디션 진단
  POSITIVE = 1, //긍정
  NEGATIVE_WITH_REASON = 2, //부정(이유 O)
  NEGATIVE_WITHOUT_REASON = 3, //부정(이유 X)
  EXTREME = 4, //극단적
}
