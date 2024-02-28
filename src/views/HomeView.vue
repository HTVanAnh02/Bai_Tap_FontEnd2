<template>
  <v-card class="custom-card" style="top: 24px; border-radius: 4px;">
    <v-row class="ml-3 mt-2">
      <v-col cols="4" sm="6" md="6" lg="2">
        <v-select v-model="SelectedCategory" density="compact" label="Chọn sản phẩm" :items="['All', 'Son', 'Kem Nền']"
          variant="outlined" style="height: 36px;"></v-select>
      </v-col>
      <v-col cols="4" sm="6" md="6" lg="2">
        <v-select v-model="selectedSort" label="Giá" density="compact" :items="['Từ cao -> thấp', 'Từ thấp -> cao']"
          variant="outlined" style="height: 36px;"></v-select>
      </v-col>
      <v-col cols="4" sm="6" md="6" lg="2">
        <v-select v-model="selectedSort" label="Giá" density="compact" :items="['Từ cao -> thấp', 'Từ thấp -> cao']"
          variant="outlined" style="height: 36px;"></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6" class="text-right">
        <v-btn style="font-family: Inter, sans-serif; background-color: rgb(212, 227, 255);color:#0f0f13" variant="tonal">
          <span class="text-capitalize">Show</span>
          <span class="text-lowercase">all</span>
        </v-btn>
        <v-btn style="font-family: Inter, sans-serif;font-weight: 400;color: rgb(34, 100, 209);" variant="elevated"
          elevation="3">
          <span class="text-capitalize font-weight-bold">Auction</span>
        </v-btn>
        <v-btn style="font-family: Inter, sans-serif; background-color:rgb(212, 227, 255);color:#0f0f13" variant="tonal">
          <span class="text-capitalize">Buy</span>
          <span class="text-lowercase">now</span>
        </v-btn>
        <v-btn style="background-color: rgb(212, 227, 255)" class="ml-5" ariant="tonal" elevation="0">
          <v-icon>mdi mdi-menu</v-icon>
        </v-btn>
        <v-btn class="mr-5" variant="elevated">
          <v-icon style="color: #0c5bda;">mdi mdi-microsoft</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <div>
      <v-row class="px-6" style="margin-top: 40px;">
        <v-chip-group>
          <h3 class="ma-2 font-weight-bold mt-3" style="font-family: Inter, sans-serif; font-size: 14px;">
            Releted
          </h3>
          <v-chip size="large" style="font-size: 14px">worldwide shipping</v-chip>
          <v-chip size="large" style="font-size: 14px">under $50</v-chip>
          <v-chip size="large" style="font-size: 14px">kitten</v-chip>
          <v-chip size="large" style="font-size: 14px">plastic plugs</v-chip>
          <v-chip size="large" style="font-size: 14px">pucker shoes</v-chip>
          <v-chip size="large" style="font-size: 14px">vintage typewriter</v-chip>
        </v-chip-group>
      </v-row>
    </div>
    <v-row class="mr-3 ml-3 mt-1">
      <v-col class="d-flex flex-column justify-center align-center" v-for="item in products" :key="item" cols="12" sm="6"
        md="4" lg="3" style="margin-top: 16px;">
        <v-card hover variant="flat" style="min-height: 472px;width: 250px;" class="mb-3 my-card">
          <v-img class="mx-auto mt-2" width="220px" height="224px" :src="item.image"></v-img>
          <v-card-text class="my-card-text"
            style="max-width: 227px;font-size: 16px;line-height: 24px; height: 90px;font-family: Inter, sans-serif;;color: #19191D;">{{
              item.name }}</v-card-text>
          <v-card-text class="mt-2 mx-auto"
            style="font-family: Inter, sans-serif;;color:#000000;max-width: 250px;font-size: 24px;font-weight: 700;padding: auto;height: 36px;">
            ${{ item.price }}
            <span v-if="item.sale > 0"
              style="border-radius: 4px;margin-right: 0.7%;font-size: 12px;float: right;min-width: 70px;min-height: 24px;padding: 2px;background-color: #ECF7ED;text-align: center;color: #37833B;font-weight: 300;font-family: Roboto, sans-serif ;">
              {{ item.sale }}% OFF
            </span>
            <span v-if="item.cool == true"
              style="border-radius: 4px;margin-right: 0.7%;font-size: 12px;float: right;min-width: 70px;min-height: 24px;padding: 2px;background-color: #FDEDF2;text-align: center;color: #C23564;font-weight: 300;font-family: Roboto, sans-serif;">
              Cool deal!
            </span>
          </v-card-text>
          <p class="ml-4"
            style="margin-top: 8px;;height: 41px;font-size: 14px;font-family: Inter, sans-serif;;color: #787885;">{{
              item.description }}</p>
          <v-row style="margin-top: 5px;margin-left: -6px;">
            <v-col class="ml-3 mt-2" cols="5" style="display: flex;">
              <v-icon color="#FB8200" size="x-small">mdi mdi-star</v-icon>
              <v-icon color="#FB8200" size="x-small">mdi mdi-star</v-icon>
              <v-icon color="#FB8200" size="x-small">mdi mdi-star</v-icon>
              <v-icon color="#FB8200" size="x-small">mdi mdi-star</v-icon>
              <v-icon v-if="item.feedback < 5 && item.feedback > 4" color="#FB8200" size="x-small">mdi
                mdi-star-half</v-icon>
              <v-icon v-else color="#FB8200" size="x-small" class="mr-2">mdi mdi-star</v-icon>
              <span class="mb-8"
                style="font-size: 14px; width: 88px; height: 32px; color: #5E6366; font-family: Roboto, sans-serif; font-weight: bold;">4.05</span>
            </v-col>
            <v-col class="text-right" cols="6">
              <v-btn class="text-capitalize"
                style="width: 88px; height: 32px; margin-right: 6px;font-family: Inter, sans-serif;font-size: 14px;" color="#2979FF"
                size="small" variant="outlined">
                <v-icon style="width: 14px; height: 12.85px;">mdi-heart-outline</v-icon>
                <div style="margin-left: 7px;">watch</div>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
  <v-row style="margin-top: 40px;">
    <v-col cols="12" sm="12" md="12" lg="4">
      <v-card class="pa-5 d-flex flex-column justify-center align-center rounded-1"
        style="min-height: 156px; background-color: #EDEDF0;">
        <img width="80" height="80" src="https://res.cloudinary.com/dyo42vgdj/image/upload/v1709114033/footer1_kp3sfu.png">
        <v-card-title class="text-center" style="font-family: Quicksand, sans-serif;font-weight: 700;font-size: 20px;">Clear & Usable user flows</v-card-title>
        <v-card-subtitle class="text-center" style="font-family: Inter, sans-serif;font-size: 14px;">Let’s boost your marketplace</v-card-subtitle>
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="12" lg="4">
      <v-card class="pa-5 d-flex flex-column justify-center align-center rounded-1"
        style="min-height: 156px; background-color: #EDEDF0;">
        <img width="80" height="80" src="https://res.cloudinary.com/dyo42vgdj/image/upload/v1709114043/footer2_qjl4zc.png">
        <v-card-title class="text-center" style="font-family: Quicksand, sans-serif;font-weight: 700;font-size: 20px;">Fine & Styled components</v-card-title>
        <v-card-subtitle class="text-center" style="font-family: Inter, sans-serif;font-size: 14px;">Speed up with Setproduct templates</v-card-subtitle>
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="12" lg="4">
      <v-card class="pa-5 d-flex flex-column justify-center align-center rounded-1"
        style="min-height: 156px; background-color: #EDEDF0;">
        <img width="80" height="80" src="https://res.cloudinary.com/dyo42vgdj/image/upload/v1709114049/footer3_xe5ctb.png">
        <v-card-title class="text-center" style="font-family: Quicksand, sans-serif;font-weight: 700;font-size: 20px;">Customizable & Reusable</v-card-title>
        <v-card-subtitle class="text-center" style="font-family: Inter, sans-serif;font-size: 14px;">Take our UX patterns and rebuild</v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue"
const products = reactive([
  {
    image: "https://media.hcdn.vn/catalog/product/t/o/top_fb_ads_210000069_310523-1685529439_img_358x358_843626_fit_center.jpg",
    name: "Son Thỏi MAC Mịn Lì 646 Marrakesh - Đỏ Đất 3g Matte Lipstick",
    description: "Son môi MAC Matte Lipstick là một trong những biểu tượng đã làm nên tên tuổi của M·A·C .",
    price: "50",
    cool: false,
    sale: 36,
    feedback: 4.7
  },
  {
    image: "https://media.hcdn.vn/catalog/product/t/o/top_fb_ads_100630045_310523-1685529534_img_358x358_843626_fit_center.jpg",
    name: "Kem Nền MAC Lâu Trôi NC20 Màu Be Vàng Cho Da Sáng 30ml",
    description: "Kem Nền Lâu Trôi MAC là dòng sản phẩm của thương hiệu mỹ phẩm M·A·C.",
    price: "180",
    cool: false,
    sale: 35,
    feedback: 5.0
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/11/kem-nen-yves-saint-laurent-ysl-all-hours-foundation-mat-lumineux-luminous-matte-tone-mn1-655590352f5ef-16112023104453.jpg",
    name: "Kem Nền Yves Saint Laurent YSL",
    description: "Kem Nền Lâu Trôi MAC là dòng sản phẩm của thương hiệu mỹ phẩm M·A·C.",
    price: "40",
    cool: false,
    sale: 25,
    feedback: 5.0
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/10/kem-nen-nars-soft-matte-complete-foundation-tone-1-45ml-653088a897e74-19102023083848.jpg",
    name: "Kem Nền Nars Soft Matte Complete Foundation Tone 1 45ml",
    description: "Kem Nền Lâu Trôi MAC là dòng sản phẩm của thương hiệu mỹ phẩm M·A·C.",
    price: "150",
    cool: false,
    sale: 40,
    feedback: 4.7
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/06/kem-nen-cle-de-peau-le-fond-de-teint-the-foundation-tone-010-28ml-64916a31991a5-20062023155825.jpg",
    name: "Kem Nền Clé De Peau Le Fond De Teint The Foundation Tone 010 28ml",
    description: "Kem Nền Lâu Trôi MAC là dòng sản phẩm của thương hiệu mỹ phẩm M·A·C.",
    price: "60",
    cool: false,
    sale: 20,
    feedback: 3.7
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/02/son-tom-ford-love-lip-color-matte-lipstick-tf-16-scarlet-rouge-mau-do-thuan-65c3240546e89-07022024133237.jpg",
    name: "Son Tom Ford Love Lip Color Matte Lipstick TF 16 Scarlet Rouge Màu Đỏ Thuần",
    description: "Son môi MAC Matte Lipstick là một trong những biểu tượng đã làm nên tên tuổi của M·A·C .",
    price: "85",
    cool: false,
    sale: 10,
    feedback: 4.7
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/01/son-givenchy-le-rouge-sheer-velvet-52-limited-edition-mau-do-cam-nau-65a754d67bd15-17012024111726.jpg",
    name: "Son Givenchy Le Rouge Sheer Velvet 52 Limited Edition Màu Đỏ Cam Nâu",
    description: "Son môi MAC Matte Lipstick là một trong những biểu tượng đã làm nên tên tuổi của M·A·C .",
    price: "95",
    cool: false,
    sale: 20,
    feedback: 4.8
  },
  {
    image: "https://media.hcdn.vn/catalog/product/t/o/top_fb_ads_100630045_310523-1685529534_img_358x358_843626_fit_center.jpg",
    name: "Kem Nền MAC Lâu Trôi NC20 Màu Be Vàng Cho Da Sáng 30ml",
    description: "Kem Nền Lâu Trôi MAC là dòng sản phẩm của thương hiệu mỹ phẩm M·A·C.",
    price: "180",
    cool: false,
    sale: 35,
    feedback: 5.0
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/11/kem-nen-yves-saint-laurent-ysl-all-hours-foundation-mat-lumineux-luminous-matte-tone-mn1-655590352f5ef-16112023104453.jpg",
    name: "Kem Nền Yves Saint Laurent YSL",
    description: "Kem Nền Lâu Trôi MAC là dòng sản phẩm của thương hiệu mỹ phẩm M·A·C.",
    price: "40",
    cool: false,
    sale: 27,
    feedback: 5.0
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/06/kem-nen-cle-de-peau-le-fond-de-teint-the-foundation-tone-010-28ml-64916a31991a5-20062023155825.jpg",
    name: "Kem Nền Clé De Peau Le Fond De Teint The Foundation Tone 010 28ml",
    description: "Kem Nền Lâu Trôi MAC là dòng sản phẩm của thương hiệu mỹ phẩm M·A·C.",
    price: "60",
    cool: false,
    sale: 20,
    feedback: 3.7
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/02/son-tom-ford-love-lip-color-matte-lipstick-tf-16-scarlet-rouge-mau-do-thuan-65c3240546e89-07022024133237.jpg",
    name: "Son Tom Ford Love Lip Color Matte Lipstick TF 16 Scarlet Rouge Màu Đỏ Thuần",
    description: "Son môi MAC Matte Lipstick là một trong những biểu tượng đã làm nên tên tuổi của M·A·C .",
    price: "85",
    cool: false,
    sale: 10,
    feedback: 4.7
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/01/son-givenchy-le-rouge-sheer-velvet-52-limited-edition-mau-do-cam-nau-65a754d67bd15-17012024111726.jpg",
    name: "Son Givenchy Le Rouge Sheer Velvet 52 Limited Edition Màu Đỏ Cam Nâu",
    description: "Son môi MAC Matte Lipstick là một trong những biểu tượng đã làm nên tên tuổi của M·A·C .",
    price: "95",
    cool: false,
    sale: 20,
    feedback: 4.8
  },
])
const SelectedCategory = ref('All')
const selectedSort = ref(null)
const Myphams = computed(() => {
  let filtered = [];

  if (SelectedCategory.value === 'All') {
    filtered = [...products];
  } else {
    filtered = products.filter(product => product.name.includes(SelectedCategory.value));
  }
  if (selectedSort.value === "Từ cao -> thấp") {
    return filtered.sort((a, b) => b.price - a.price);
  } else {
    return filtered.sort((a, b) => a.price - b.price);
  }
});
</script>

<style scop>
.custom-card {
  border-radius: 8px;
  /* Điều chỉnh giá trị theo mong muốn để có độ bo tròn nhẹ */
}

.custom-col {
  width: 136px;
  height: 36px;
  position: relative;
  top: 16px;
  /* Khoảng cách từ v-col lên đến v-card */
  margin: 0 16px;
  /* Khoảng cách từ v-col đến v-card bên trái và bên phải */
}

.custom-row {
  margin-bottom: 16px;
  /* Khoảng cách giữa các dòng (nếu cần) */
}

.custom-col {
  width: 136px;
  height: 36px;
  position: relative;
  top: 40px;
  left: 16px;
}

.custom-shadow {
  margin-top: 10px;
  box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.2);
}

.my-card {
  max-height: 200px;
  /* Đặt chiều cao tối đa của thẻ */
  overflow: hidden;
  /* Ẩn phần nội dung vượt quá chiều cao */
}

.my-card-text {
  overflow-y: hidden;
}
</style>
