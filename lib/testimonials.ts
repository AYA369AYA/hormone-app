/**
 * 体験者の声セクション用データ。今後、実際の体験談・顔写真が用意でき次第、
 * この配列を追加・編集するだけで反映される（コンポーネント側の変更は不要）。
 */
export interface Testimonial {
  id: string;
  name: string;
  /** 年代（例: "40代"） */
  ageRange: string;
  /** ご職業。任意項目のため未設定可。 */
  occupation?: string;
  before: string;
  current: string;
  message: string;
  /** 後日、許諾済みの顔写真を用意でき次第このパスを設定する。 */
  photoSrc?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-01",
    name: "M.Sさん",
    ageRange: "40代",
    occupation: "会社員",
    before: "朝起きるのがつらく、夕方には何もできないほど疲れていた",
    current: "朝すっきり目覚められる日が増え、夕方も穏やかに過ごせている",
    message:
      "自分の身体のリズムを知ることで、無理をしていた自分に気づけました。今は身体の声を聞きながら過ごせています。",
  },
  {
    id: "testimonial-02",
    name: "K.Yさん",
    ageRange: "30代",
    occupation: "自営業",
    before: "生理前になると気分の浮き沈みが激しく、周囲に当たってしまっていた",
    current: "自分の状態を理解できるようになり、心穏やかに過ごせる日が増えた",
    message: "「甘えではなく、身体のサインだったんだ」と思えたことが、一番の変化でした。",
  },
  {
    id: "testimonial-03",
    name: "A.Tさん",
    ageRange: "50代",
    before: "頑張り続けることが当たり前で、休むことに罪悪感があった",
    current: "自分を労わることが、家族や仕事にも良い影響を与えると感じられている",
    message: "身体を知ることは、自分を大切にすることだと、今なら心から言えます。",
  },
];
