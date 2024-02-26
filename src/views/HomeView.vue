<template>
  <v-card class="custom-card" :style="{ top: '24px' }">
    <v-row class="ml-3 mt-0">
      <v-col cols="4" sm="6" md="6" lg="2">
        <v-select v-model="SelectedCategory" density="compact" label="Chọn sản phẩm" :items="['All', 'Quần', 'Áo']"
          variant="outlined"></v-select>
      </v-col>
      <v-col cols="4" sm="6" md="6" lg="2">
        <v-select v-model="selectedSort" label="Giá" density="compact" :items="['Từ cao -> thấp', 'Từ thấp -> cao']"
          variant="outlined"></v-select>
      </v-col>
      <v-col cols="4" sm="6" md="6" lg="2" >
        <v-select density="compact" :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          variant="outlined"></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6" class="text-right">
        <v-btn style="background-color: #bfd0fb;color:#4d4d50" class="rounded-1 text-capitalize" variant="tonal">
          Show all
        </v-btn>
        <v-btn style="font-weight: bold;color: #2264D1;" bg-color="white" class="rounded-1 text-capitalize"
          variant="elevated">
          Action
        </v-btn>
        <v-btn style="background-color: #adc4fe;color:#4d4d50" class="rounded-1 text-capitalize" variant="tonal">
          Buy now
        </v-btn>
        <v-btn style="background-color: #adc4fe" class="ml-5" ariant="tonal">
          <v-icon>mdi mdi-menu</v-icon>
        </v-btn>
        <v-btn class="mr-5" variant="elevated">
          <v-icon style="color: #0c5bda;">mdi mdi-microsoft</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <div>
      <v-row class="px-6">
        <v-chip-group>
          <h3 class="ma-2 font-weight-bold mt-3" style="font-size: 14px; color: #19191d">
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
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="3" v-for="(mypham, i) in Myphams" :key="i">
        <v-card class="custom-shadow" height="472px" with="258px" align="center" variant="flat" hover rounded="lg">
          <v-img :src="mypham.image" width="227" height="224" contain class="flex-grow-1  margin-bottom: 10px"
            style="object-fit: cover"></v-img>
          <v-card-text class="mt-1 text-left" style="font-size: 16px; color: #19191d">
            {{ mypham.title }}
          </v-card-text>
          <v-card-text class="mt-n4 text-left " style="font-size: 14px; font-weight: 700;padding: auto; color: #040404"
            height="226px" width="21px">
            <p style="font-size: 24px ;margin: left 20px;"> ${{ mypham.price }} </p>
            <span v-if="mypham.sale > 0"
              style="margin-right: -1.5%;font-size: 12px;float: right;min-width: 70px;min-height: 24px;padding: 2px;background-color: #e2f3e8;text-align: center;color: #ee741c;font-weight: 300;">
              {{ mypham.sale }}% OFF
            </span>
          </v-card-text>
          <v-card-text class="mt-n2 text-left" style="font-size: 14px; color: #787885">
            {{ mypham.description }}
          </v-card-text>
          <v-card-actions>
            <v-row class="mt-n4">
              <v-col class="ml-3 mt-1" cols="5" style="display: flex;">
                <v-icon color="#FB8200" size="x-small" style="font-size: 16px;">mdi mdi-star</v-icon>
                <v-icon color="#FB8200" size="x-small" style="font-size: 16px;">mdi mdi-star</v-icon>
                <v-icon color="#FB8200" size="x-small" style="font-size: 16px;">mdi mdi-star</v-icon>
                <v-icon color="#FB8200" style="font-size: 16px;" v-if="mypham.feedback == 5" size="x-small">mdi
                  mdi-star</v-icon>
                <v-icon color="#FB8200" style="font-size: 16px;" v-if="(mypham.feedback < 5 && mypham.feedback > 4)"
                  size="x-small">mdi mdi-star-half</v-icon>
                <span style="font-size: 16px; margin-top: -4px;">{{ mypham.feedback }}</span>
              </v-col>
              <v-col class="text-right" cols="6">
                <v-btn class="text-capitalize" color="primary" size="small" prepend-icon="mdi-heart-outline"
                  variant="outlined" style="margin-top: -4px;">
                  Watch
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" sm="12" lg="4">
        <v-card variant="tonal" height="156px" with="361px">
          <v-card-title class="text-center mt-4">
            <v-img src="../assets/img/Vector.png" height="44px" with="44px" class="ma-2"></v-img>
          </v-card-title>
          <v-card-text class="text-center font-weight-bold" style="font-size: 20px;">Clear & Usable user
            flows</v-card-text>
          <p class="text-center" style="font-size: 14px;">Let’s boost yout marketplace</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12" lg="4">
        <v-card variant="tonal" height="156px" with="361px">
          <v-card-title class="text-center mt-4">
            <v-img src="../assets/img/Vector1.png" height="44px" with="44px" class="ma-2"></v-img>
          </v-card-title>
          <v-card-text class="text-center font-weight-bold" style="font-size: 20px;">Fine & Styled
            components</v-card-text>
          <p class="text-center" style="font-size: 14px;">Speed up with Setproduct templates</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12" lg="4">
        <v-card variant="tonal" height="156px" with="361px">
          <v-card-title class="text-center mt-4">
            <v-img src="../assets/img/lightbulb-on-outline.png" height="44px" with="44px" class="ma-2"></v-img>
          </v-card-title>
          <v-card-text class="text-center font-weight-bold" style="font-size: 20px;">Customizable &
            Reusable</v-card-text>
          <p class="text-center" style="font-size: 14px;">Take our UX patterns and rebuild</p>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue"

const products = reactive([
  {
    image: "https://media.hcdn.vn/catalog/product/t/o/top_fb_ads_210000069_310523-1685529439_img_358x358_843626_fit_center.jpg",
    title: "Son Thỏi MAC Mịn Lì 646 Marrakesh - Đỏ Đất 3g Matte Lipstick",
    description: "Son môi MAC Matte Lipstick là một trong những dòng son mang tính biểu tượng đã làm nên tên tuổi của M·A·C .",
    price: "50",
    sale: 60,
    feedback: 4.7
  },
  {
    image: "https://media.hcdn.vn/catalog/product/t/o/top_fb_ads_100630045_310523-1685529534_img_358x358_843626_fit_center.jpg",
    title: "Kem Nền MAC Lâu Trôi NC20 Màu Be Vàng Cho Da Sáng 30ml",
    description: "Kem Nền Lâu Trôi MAC Studio Fix Fluid SPF 15 là dòng sản phẩm kem nền bán chạy nhất của thương hiệu mỹ phẩm M·A·C.",
    price: "180",
    sale: 30,
    feedback: 5.0
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/11/kem-nen-yves-saint-laurent-ysl-all-hours-foundation-mat-lumineux-luminous-matte-tone-mn1-655590352f5ef-16112023104453.jpg",
    title: "Kem Nền Yves Saint Laurent YSL",
    description: "Kem Nền Lâu Trôi MAC Studio Fix Fluid SPF 15 là dòng sản phẩm kem nền bán chạy nhất của thương hiệu mỹ phẩm M·A·C.",
    price: "40",
    sale: 25,
    feedback: 5.0
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/10/kem-nen-nars-soft-matte-complete-foundation-tone-1-45ml-653088a897e74-19102023083848.jpg",
    title: "Kem Nền Nars Soft Matte Complete Foundation Tone 1 45ml",
    description: "Kem Nền Lâu Trôi MAC Studio Fix Fluid SPF 15 là dòng sản phẩm kem nền bán chạy nhất của thương hiệu mỹ phẩm M·A·C.",
    price: "150",
    sale: 40,
    feedback: 4.7
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/06/kem-nen-cle-de-peau-le-fond-de-teint-the-foundation-tone-010-28ml-64916a31991a5-20062023155825.jpg",
    title: "Kem Nền Clé De Peau Le Fond De Teint The Foundation Tone 010 28ml",
    description: "SKem Nền Lâu Trôi MAC Studio Fix Fluid SPF 15 là dòng sản phẩm kem nền bán chạy nhất của thương hiệu mỹ phẩm M·A·C.",
    price: "60",
    sale: 20,
    feedback: 3.7
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/02/son-tom-ford-love-lip-color-matte-lipstick-tf-16-scarlet-rouge-mau-do-thuan-65c3240546e89-07022024133237.jpg",
    title: "Son Tom Ford Love Lip Color Matte Lipstick TF 16 Scarlet Rouge Màu Đỏ Thuần",
    description: "Son môi MAC Matte Lipstick là một trong những dòng son mang tính biểu tượng đã làm nên tên tuổi của M·A·C .",
    price: "85",
    sale: 10,
    feedback: 4.7
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/01/son-givenchy-le-rouge-sheer-velvet-52-limited-edition-mau-do-cam-nau-65a754d67bd15-17012024111726.jpg",
    title: "Son Givenchy Le Rouge Sheer Velvet 52 Limited Edition Màu Đỏ Cam Nâu",
    description: "Son môi MAC Matte Lipstick là một trong những dòng son mang tính biểu tượng đã làm nên tên tuổi của M·A·C .",
    price: "95",
    sale: 20,
    feedback: 4.8
  },
  {
    image: "https://media.hcdn.vn/catalog/product/t/o/top_fb_ads_100630045_310523-1685529534_img_358x358_843626_fit_center.jpg",
    title: "Kem Nền MAC Lâu Trôi NC20 Màu Be Vàng Cho Da Sáng 30ml",
    description: "Kem Nền Lâu Trôi MAC Studio Fix Fluid SPF 15 là dòng sản phẩm kem nền bán chạy nhất của thương hiệu mỹ phẩm M·A·C.",
    price: "180",
    sale: 30,
    feedback: 5.0
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/11/kem-nen-yves-saint-laurent-ysl-all-hours-foundation-mat-lumineux-luminous-matte-tone-mn1-655590352f5ef-16112023104453.jpg",
    title: "Kem Nền Yves Saint Laurent YSL",
    description: "Kem Nền Lâu Trôi MAC Studio Fix Fluid SPF 15 là dòng sản phẩm kem nền bán chạy nhất của thương hiệu mỹ phẩm M·A·C.",
    price: "40",
    sale: 27,
    feedback: 5.0
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/06/kem-nen-cle-de-peau-le-fond-de-teint-the-foundation-tone-010-28ml-64916a31991a5-20062023155825.jpg",
    title: "Kem Nền Clé De Peau Le Fond De Teint The Foundation Tone 010 28ml",
    description: "SKem Nền Lâu Trôi MAC Studio Fix Fluid SPF 15 là dòng sản phẩm kem nền bán chạy nhất của thương hiệu mỹ phẩm M·A·C.",
    price: "60",
    sale: 20,
    feedback: 3.7
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/02/son-tom-ford-love-lip-color-matte-lipstick-tf-16-scarlet-rouge-mau-do-thuan-65c3240546e89-07022024133237.jpg",
    title: "Son Tom Ford Love Lip Color Matte Lipstick TF 16 Scarlet Rouge Màu Đỏ Thuần",
    description: "Son môi MAC Matte Lipstick là một trong những dòng son mang tính biểu tượng đã làm nên tên tuổi của M·A·C .",
    price: "85",
    sale: 10,
    feedback: 4.7
  },
  {
    image: "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/01/son-givenchy-le-rouge-sheer-velvet-52-limited-edition-mau-do-cam-nau-65a754d67bd15-17012024111726.jpg",
    title: "Son Givenchy Le Rouge Sheer Velvet 52 Limited Edition Màu Đỏ Cam Nâu",
    description: "Son môi MAC Matte Lipstick là một trong những dòng son mang tính biểu tượng đã làm nên tên tuổi của M·A·C .",
    price: "95",
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
    filtered = products.filter(product => product.title.includes(SelectedCategory.value));
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
}</style>
