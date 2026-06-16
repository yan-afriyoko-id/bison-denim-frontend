<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-2 sm:p-4"
    @click.self="handleClose"
  >
    <div
      class="bg-white rounded-[10px] w-full max-w-[766px] max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <!-- Modal Header -->
      <div
        class="flex items-center justify-between px-4 sm:px-5 md:px-6 pt-5 sm:pt-6 md:pt-8"
      >
        <h2 class="text-xl sm:text-2xl font-semibold text-[#1A1919]">
          {{ editingAddress ? "Ubah Alamat" : "Alamat Baru" }}
        </h2>
        <button
          @click="handleClose"
          class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-[#F8F8F8] rounded-full transition hover:cursor-pointer shrink-0"
        >
          <div class="w-5 h-5 sm:w-6 sm:h-6">
            <svg
              class="w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#1A1919"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>

      <!-- Modal Content -->
      <form
        @submit.prevent="handleSubmit"
        class="py-4 sm:py-5 px-4 sm:px-6 md:px-8 space-y-4 sm:space-y-5 md:space-y-6"
      >
        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4"
        >
          <p class="text-sm sm:text-base text-red-600">{{ errorMessage }}</p>
        </div>

        <!-- Tandai Sebagai -->
        <div>
          <label
            class="block text-sm sm:text-base text-[#1A1919] font-medium mb-2 sm:mb-3"
          >
            Tandai Sebagai:
          </label>
          <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              v-for="label in addressLabels"
              :key="label"
              type="button"
              @click="form.label = label"
              :class="[
                'px-3 sm:px-4 py-1.5 sm:py-2 border rounded-lg font-medium text-sm sm:text-base md:text-lg transition hover:cursor-pointer',
                form.label === label
                  ? 'border-[#E9322B] text-[#E9322B] bg-[#E9322B14]'
                  : 'border-[#E6E9F0] text-[#808080] hover:border-[#E9322B] hover:bg-[#E9322B14]',
              ]"
            >
              {{ label }}
            </button>
          </div>
        </div>

        <!-- Nama Penerima dan Nomor HP Penerima -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label
              class="block text-sm sm:text-base text-[#1A1919] font-medium mb-2"
            >
              Nama Penerima:
            </label>
            <input
              v-model="form.name"
              type="text"
              :class="[
                'w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none text-sm sm:text-base md:text-lg',
                fieldErrors?.name
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#E6E9F0] focus:border-[#E9322B]',
              ]"
              placeholder="Masukkan nama penerima"
            />
            <p
              v-if="fieldErrors?.name"
              class="mt-1 text-xs sm:text-sm text-red-600"
            >
              {{ fieldErrors.name[0] }}
            </p>
          </div>

          <div>
            <label
              class="block text-sm sm:text-base text-[#1A1919] font-medium mb-2"
            >
              Nomor Hp Penerima <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.phone"
              type="tel"
              :class="[
                'w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none text-sm sm:text-base md:text-lg',
                fieldErrors?.phone
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#E6E9F0] focus:border-[#E9322B]',
              ]"
              placeholder="Contoh: 081234567890 atau +6281234567890"
            />
            <p
              v-if="fieldErrors?.phone"
              class="mt-1 text-xs sm:text-sm text-red-600"
            >
              {{ fieldErrors.phone[0] }}
            </p>
          </div>
        </div>

        <!-- Province, City, District, Sub-District -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          <div>
            <label
              class="block text-sm sm:text-base text-[#1A1919] font-medium mb-2"
            >
              Provinsi <span class="text-red-500">*</span>
            </label>
            <select
              v-model="selectedProvinceId"
              :disabled="loadingProvinces"
              :class="[
                'w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none text-sm sm:text-base md:text-lg',
                fieldErrors?.province
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#E6E9F0] focus:border-[#E9322B]',
                loadingProvinces
                  ? 'bg-[#F2F4F7] cursor-not-allowed'
                  : 'bg-white',
              ]"
            >
              <option :value="null">Pilih Provinsi</option>
              <option
                v-for="province in provinces"
                :key="province.id"
                :value="province.id"
              >
                {{ province.name }}
              </option>
            </select>
            <p
              v-if="fieldErrors?.province"
              class="mt-1 text-xs sm:text-sm text-red-600"
            >
              {{ fieldErrors.province[0] }}
            </p>
            <p
              v-if="loadingProvinces"
              class="mt-1 text-xs sm:text-sm text-[#7B7B7B]"
            >
              Memuat provinsi...
            </p>
          </div>

          <div>
            <label
              class="block text-sm sm:text-base text-[#1A1919] font-medium mb-2"
            >
              Kota/Kabupaten <span class="text-red-500">*</span>
            </label>
            <select
              v-model="selectedCityId"
              :disabled="loadingCities || !selectedProvinceId"
              :class="[
                'w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none text-sm sm:text-base md:text-lg',
                fieldErrors?.city
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#E6E9F0] focus:border-[#E9322B]',
                loadingCities || !selectedProvinceId
                  ? 'bg-[#F2F4F7] cursor-not-allowed'
                  : 'bg-white',
              ]"
            >
              <option :value="null">Pilih Kota/Kabupaten</option>
              <option v-for="city in cities" :key="city.id" :value="city.id">
                {{ city.name }}
              </option>
            </select>
            <p
              v-if="fieldErrors?.city"
              class="mt-1 text-xs sm:text-sm text-red-600"
            >
              {{ fieldErrors.city[0] }}
            </p>
            <p
              v-if="loadingCities"
              class="mt-1 text-xs sm:text-sm text-[#7B7B7B]"
            >
              Memuat kota/kabupaten...
            </p>
            <p
              v-else-if="!selectedProvinceId"
              class="mt-1 text-xs sm:text-sm text-[#7B7B7B]"
            >
              Pilih provinsi terlebih dahulu
            </p>
          </div>

          <div>
            <label
              class="block text-sm sm:text-base text-[#1A1919] font-medium mb-2"
            >
              Kecamatan <span class="text-red-500">*</span>
            </label>
            <select
              v-model="selectedDistrictId"
              :disabled="loadingDistricts || !selectedCityId"
              :class="[
                'w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none text-sm sm:text-base md:text-lg',
                fieldErrors?.district
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#E6E9F0] focus:border-[#E9322B]',
                loadingDistricts || !selectedCityId
                  ? 'bg-[#F2F4F7] cursor-not-allowed'
                  : 'bg-white',
              ]"
            >
              <option :value="null">Pilih Kecamatan</option>
              <option
                v-for="district in districts"
                :key="district.id"
                :value="district.id"
              >
                {{ district.name }}
              </option>
            </select>
            <p
              v-if="fieldErrors?.district"
              class="mt-1 text-xs sm:text-sm text-red-600"
            >
              {{ fieldErrors.district[0] }}
            </p>
            <p
              v-if="loadingDistricts"
              class="mt-1 text-xs sm:text-sm text-[#7B7B7B]"
            >
              Memuat kecamatan...
            </p>
            <p
              v-else-if="!selectedCityId"
              class="mt-1 text-xs sm:text-sm text-[#7B7B7B]"
            >
              Pilih kota/kabupaten terlebih dahulu
            </p>
          </div>

          <div>
            <label
              class="block text-sm sm:text-base text-[#1A1919] font-medium mb-2"
            >
              Kelurahan <span class="text-red-500">*</span>
            </label>
            <select
              v-model="selectedSubDistrictId"
              :disabled="loadingSubDistricts || !selectedDistrictId"
              :class="[
                'w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none text-sm sm:text-base md:text-lg',
                fieldErrors?.sub_district
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#E6E9F0] focus:border-[#E9322B]',
                loadingSubDistricts || !selectedDistrictId
                  ? 'bg-[#F2F4F7] cursor-not-allowed'
                  : 'bg-white',
              ]"
            >
              <option :value="null">Pilih Kelurahan</option>
              <option
                v-for="subDistrict in subDistricts"
                :key="subDistrict.id"
                :value="subDistrict.id"
              >
                {{ subDistrict.name }}
              </option>
            </select>
            <p
              v-if="fieldErrors?.sub_district"
              class="mt-1 text-xs sm:text-sm text-red-600"
            >
              {{ fieldErrors.sub_district[0] }}
            </p>
            <p
              v-if="loadingSubDistricts"
              class="mt-1 text-xs sm:text-sm text-[#7B7B7B]"
            >
              Memuat kelurahan...
            </p>
            <p
              v-else-if="!selectedDistrictId"
              class="mt-1 text-xs sm:text-sm text-[#7B7B7B]"
            >
              Pilih kecamatan terlebih dahulu
            </p>
          </div>
        </div>

        <div>
          <label
            class="block text-sm sm:text-base text-[#1A1919] font-medium mb-2"
          >
            Kode Pos <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.postalCode"
            type="text"
            :class="[
              'w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none text-sm sm:text-base md:text-lg',
              fieldErrors?.postal_code
                ? 'border-red-500 focus:border-red-500'
                : 'border-[#E6E9F0] focus:border-[#E9322B]',
            ]"
            placeholder="Contoh: 40111"
            :readonly="selectedSubDistrictId !== null"
          />
          <p
            v-if="fieldErrors?.postal_code"
            class="mt-1 text-xs sm:text-sm text-red-600"
          >
            {{ fieldErrors.postal_code[0] }}
          </p>
          <p
            v-if="selectedSubDistrictId && selectedSubDistrict"
            class="mt-1 text-xs sm:text-sm text-[#7B7B7B]"
          >
            Kode pos akan terisi otomatis dari data kelurahan yang dipilih
          </p>
          <p
            v-else-if="selectedDistrictId && selectedDistrict"
            class="mt-1 text-xs sm:text-sm text-[#7B7B7B]"
          >
            Kode pos akan terisi otomatis dari data kecamatan yang dipilih
          </p>
        </div>

        <!-- Alamat Lengkap -->
        <div>
          <label
            class="block text-sm sm:text-base text-[#1A1919] font-medium mb-2"
          >
            Alamat Lengkap dan Catatan untuk Kurir
          </label>
          <textarea
            v-model="form.fullAddress"
            rows="3"
            :class="[
              'w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none resize-none text-sm sm:text-base md:text-lg',
              fieldErrors?.address
                ? 'border-red-500 focus:border-red-500'
                : 'border-[#E6E9F0] focus:border-[#E9322B]',
            ]"
            placeholder="Masukkan nama jalan, gedung, lantai, nomor, RT/RW, dan catatan untuk kurir (contoh: warna rumah, no. apartemen)"
          ></textarea>
          <p
            v-if="fieldErrors?.address"
            class="mt-1 text-xs sm:text-sm text-red-600"
          >
            {{ fieldErrors.address[0] }}
          </p>
        </div>

        <!-- Koordinat Lokasi -->
        <!-- <div>
          <label class="block text-sm sm:text-base text-[#1A1919] font-medium mb-2">
            Koordinat Lokasi
          </label>
          <div class="flex items-center justify-center bg-[#F8F8F8] border border-dashed border-[#E6E9F0] rounded-md py-5 sm:py-6 md:py-7">
            <button
              type="button"
              class="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E6E9F0] rounded-md text-[#ACACAC] hover:bg-[#F8F8F8] transition hover:cursor-pointer bg-white text-xs sm:text-sm md:text-[15px]"
            >
              <div class="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0">
                <svg
                  class="w-full h-full"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_703_8334)">
                    <path d="M9 9.75C11.4853 9.75 13.5 7.73528 13.5 5.25C13.5 2.76472 11.4853 0.75 9 0.75C6.51472 0.75 4.5 2.76472 4.5 5.25C4.5 7.73528 6.51472 9.75 9 9.75Z" stroke="#ACACAC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 9.75V17.25" stroke="#ACACAC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_703_8334">
                      <rect width="18" height="18" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              Pilih lokasi
            </button>
          </div>
        </div> -->
      </form>

      <!-- Modal Footer -->
      <div class="px-4 sm:px-5 md:px-6 pb-5 sm:pb-6 md:pb-8">
        <button
          type="button"
          @click="handleSubmit"
          class="w-full bg-[#E9322B] text-white py-2 sm:py-2.5 rounded-lg font-medium text-base sm:text-lg hover:bg-[#C4282B] transition hover:cursor-pointer"
        >
          Simpan Alamat
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  Province,
  City,
  District,
  SubDistrict,
} from "~/composables/useShippingApi";

interface Address {
  id?: number;
  label: string;
  name: string;
  phone: string;
  fullAddress: string;
  province: string;
  city: string;
  postalCode: string;
  administrativeRegion?: string;
  isPrimary: boolean;
  province_id?: number;
  province_label?: string;
  city_id?: number;
  city_label?: string;
  district_id?: number;
  district_label?: string;
  sub_district_id?: number;
  sub_district_label?: string;
}

interface Props {
  modelValue: boolean;
  editingAddress?: Address | null;
}

const props = withDefaults(defineProps<Props>(), {
  editingAddress: null,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  save: [address: Address];
}>();

const addressLabels = ["Rumah", "Kantor", "Apartement", "Kost"];

const { getProvinces, getCities, getDistricts, getSubDistricts } =
  useShippingApi();

const errorMessage = ref<string>("");
const fieldErrors = ref<Record<string, string[]>>({});

// RajaOngkir states
const provinces = ref<Province[]>([]);
const cities = ref<City[]>([]);
const districts = ref<District[]>([]);
const subDistricts = ref<SubDistrict[]>([]);
const selectedProvinceId = ref<number | null>(null);
const selectedCityId = ref<number | null>(null);
const selectedDistrictId = ref<number | null>(null);
const selectedSubDistrictId = ref<number | null>(null);
const loadingProvinces = ref(false);
const loadingCities = ref(false);
const loadingDistricts = ref(false);
const loadingSubDistricts = ref(false);

const form = ref<Address>({
  label: "",
  name: "",
  phone: "",
  fullAddress: "",
  province: "",
  city: "",
  postalCode: "",
  administrativeRegion: "",
  isPrimary: false,
});

const selectedProvince = computed(() => {
  if (!selectedProvinceId.value) return null;
  return provinces.value.find((p) => p.id === selectedProvinceId.value);
});

const selectedCity = computed(() => {
  if (!selectedCityId.value) return null;
  return cities.value.find((c) => c.id === selectedCityId.value);
});

const selectedDistrict = computed(() => {
  if (!selectedDistrictId.value) return null;
  return districts.value.find((d) => d.id === selectedDistrictId.value);
});

const selectedSubDistrict = computed(() => {
  if (!selectedSubDistrictId.value) return null;
  return subDistricts.value.find((sd) => sd.id === selectedSubDistrictId.value);
});

// Load provinces
const loadProvinces = async () => {
  loadingProvinces.value = true;
  try {
    const { data, error } = await getProvinces();
    if (error || !data?.success) {
      console.error("Error loading provinces:", error);
      return;
    }
    provinces.value = data.data || [];
  } catch (error) {
    console.error("Error loading provinces:", error);
  } finally {
    loadingProvinces.value = false;
  }
};

// Load cities by province
const loadCities = async (provinceId: number) => {
  loadingCities.value = true;
  cities.value = [];
  districts.value = [];
  selectedCityId.value = null;
  selectedDistrictId.value = null;
  form.value.city = "";
  form.value.postalCode = "";

  try {
    const { data, error } = await getCities(provinceId);
    if (error || !data?.success) {
      console.error("Error loading cities:", error);
      return;
    }
    cities.value = data.data || [];
  } catch (error) {
    console.error("Error loading cities:", error);
  } finally {
    loadingCities.value = false;
  }
};

// Load districts by city
const loadDistricts = async (cityId: number) => {
  loadingDistricts.value = true;
  districts.value = [];
  subDistricts.value = [];
  selectedDistrictId.value = null;
  selectedSubDistrictId.value = null;
  form.value.postalCode = "";

  try {
    const { data, error } = await getDistricts(cityId);
    if (error || !data?.success) {
      console.error("Error loading districts:", error);
      return;
    }
    districts.value = data.data || [];
  } catch (error) {
    console.error("Error loading districts:", error);
  } finally {
    loadingDistricts.value = false;
  }
};

// Load sub-districts by district
const loadSubDistricts = async (districtId: number) => {
  loadingSubDistricts.value = true;
  subDistricts.value = [];
  selectedSubDistrictId.value = null;
  form.value.postalCode = "";

  try {
    const { data, error } = await getSubDistricts(districtId);
    if (error || !data?.success) {
      console.error("Error loading sub-districts:", error);
      return;
    }
    subDistricts.value = data.data || [];
  } catch (error) {
    console.error("Error loading sub-districts:", error);
  } finally {
    loadingSubDistricts.value = false;
  }
};

// Watch for province selection
watch(selectedProvinceId, (newProvinceId) => {
  if (newProvinceId) {
    const province = provinces.value.find((p) => p.id === newProvinceId);
    if (province) {
      form.value.province = province.name;
      form.value.province_id = newProvinceId;
    }
    loadCities(newProvinceId);
  } else {
    cities.value = [];
    selectedCityId.value = null;
    form.value.province = "";
    form.value.city = "";
    form.value.postalCode = "";
  }
});

// Watch for city selection
watch(selectedCityId, (newCityId) => {
  if (newCityId && selectedCity.value) {
    const city = selectedCity.value;
    form.value.city = city.name;
    form.value.city_id = newCityId;
    // Load districts for selected city
    loadDistricts(newCityId);
  } else {
    districts.value = [];
    selectedDistrictId.value = null;
    form.value.city = "";
    form.value.postalCode = "";
  }
});

// Watch for district selection
watch(selectedDistrictId, (newDistrictId) => {
  if (newDistrictId && selectedDistrict.value) {
    const district = selectedDistrict.value;
    form.value.district_id = newDistrictId;
    // Load sub-districts for selected district
    loadSubDistricts(newDistrictId);
  } else {
    subDistricts.value = [];
    selectedSubDistrictId.value = null;
    form.value.postalCode = "";
  }
});

// Watch for sub-district selection
watch(selectedSubDistrictId, (newSubDistrictId) => {
  if (newSubDistrictId && selectedSubDistrict.value) {
    const subDistrict = selectedSubDistrict.value;
    form.value.sub_district_id = newSubDistrictId;
    // Auto-fill postal code if available and not "0"
    if (subDistrict.zip_code && subDistrict.zip_code !== "0") {
      form.value.postalCode = subDistrict.zip_code;
    }
  } else {
    form.value.postalCode = "";
  }
});

const resetForm = () => {
  form.value = {
    label: "",
    name: "",
    phone: "",
    fullAddress: "",
    province: "",
    city: "",
    postalCode: "",
    administrativeRegion: "",
    isPrimary: false,
  };
  selectedProvinceId.value = null;
  selectedCityId.value = null;
  selectedDistrictId.value = null;
  selectedSubDistrictId.value = null;
  cities.value = [];
  districts.value = [];
  subDistricts.value = [];
};

// Find province ID from province name
const findProvinceId = async (provinceName: string): Promise<number | null> => {
  if (!provinceName || provinces.value.length === 0) return null;

  const province = provinces.value.find(
    (p: Province) =>
      p.name?.toLowerCase().includes(provinceName.toLowerCase()) ||
      provinceName.toLowerCase().includes(p.name?.toLowerCase() || ""),
  );

  return province ? province.id : null;
};

// Find city ID from city name
const findCityId = async (
  cityName: string,
  provinceId: number,
): Promise<number | null> => {
  if (!cityName || !provinceId) return null;

  // Load cities if not already loaded
  if (cities.value.length === 0) {
    await loadCities(provinceId);
  }

  const city = cities.value.find((c: City) => {
    const cityNameLower = cityName.toLowerCase();
    const cityNameInData = c.name?.toLowerCase() || "";
    return (
      cityNameLower.includes(cityNameInData) ||
      cityNameInData.includes(cityNameLower) ||
      cityNameLower === cityNameInData
    );
  });

  return city ? city.id : null;
};

// Find district ID from district name
const findDistrictId = async (
  districtName: string,
  cityId: number,
): Promise<number | null> => {
  if (!districtName || !cityId) return null;

  // Load districts if not already loaded
  if (districts.value.length === 0) {
    await loadDistricts(cityId);
  }

  const district = districts.value.find((d: District) => {
    const districtNameLower = districtName.toLowerCase();
    const districtNameInData = d.name?.toLowerCase() || "";
    return (
      districtNameLower.includes(districtNameInData) ||
      districtNameInData.includes(districtNameLower) ||
      districtNameLower === districtNameInData
    );
  });

  return district ? district.id : null;
};

// Find sub-district ID from sub-district name
const findSubDistrictId = async (
  subDistrictName: string,
  districtId: number,
): Promise<number | null> => {
  if (!subDistrictName || !districtId) return null;

  // Load sub-districts if not already loaded
  if (subDistricts.value.length === 0) {
    await loadSubDistricts(districtId);
  }

  const subDistrict = subDistricts.value.find((sd: SubDistrict) => {
    const subDistrictNameLower = subDistrictName.toLowerCase();
    const subDistrictNameInData = sd.name?.toLowerCase() || "";
    return (
      subDistrictNameLower.includes(subDistrictNameInData) ||
      subDistrictNameInData.includes(subDistrictNameLower) ||
      subDistrictNameLower === subDistrictNameInData
    );
  });

  return subDistrict ? subDistrict.id : null;
};

// Watch for editingAddress changes to populate form
watch(
  () => props.editingAddress,
  async (newAddress) => {
    if (newAddress) {
      form.value = {
        label: newAddress.label || "",
        name: newAddress.name || "",
        phone: newAddress.phone || "",
        fullAddress: newAddress.fullAddress || "",
        province: newAddress.province || "",
        city: newAddress.city || "",
        postalCode: newAddress.postalCode || "",
        administrativeRegion: newAddress.administrativeRegion || "",
        isPrimary: newAddress.isPrimary || false,
        province_id: newAddress.province_id,
        city_id: newAddress.city_id,
        district_id: newAddress.district_id,
        sub_district_id: newAddress.sub_district_id,
      };

      // Try to set province, city, district, and sub-district dropdowns if we have IDs
      if (newAddress.province_id) {
        if (provinces.value.length === 0) {
          await loadProvinces();
        }
        selectedProvinceId.value = newAddress.province_id;
        if (newAddress.city_id) {
          await loadCities(newAddress.province_id);
          selectedCityId.value = newAddress.city_id;
          if (newAddress.district_id) {
            await loadDistricts(newAddress.city_id);
            selectedDistrictId.value = newAddress.district_id;
            if (newAddress.sub_district_id) {
              await loadSubDistricts(newAddress.district_id);
              selectedSubDistrictId.value = newAddress.sub_district_id;
            }
          }
        }
      } else if (newAddress.province && provinces.value.length > 0) {
        const provinceId = await findProvinceId(newAddress.province);
        if (provinceId) {
          selectedProvinceId.value = provinceId;

          // Wait for cities to load, then find city
          if (newAddress.city) {
            await loadCities(provinceId);
            const cityId =
              newAddress.city_id ||
              (await findCityId(newAddress.city, provinceId));
            if (cityId) {
              selectedCityId.value = cityId;

              // Wait for districts to load, then find district
              if (newAddress.district_id) {
                await loadDistricts(cityId);
                selectedDistrictId.value = newAddress.district_id;

                // Wait for sub-districts to load, then find sub-district
                if (newAddress.sub_district_id) {
                  await loadSubDistricts(newAddress.district_id);
                  selectedSubDistrictId.value = newAddress.sub_district_id;
                }
              }
            }
          }
        }
      }
    } else {
      resetForm();
    }
  },
  { immediate: true, deep: true },
);

// Reset form when modal closes
watch(
  () => props.modelValue,
  async (isOpen) => {
    if (!isOpen) {
      resetForm();
      errorMessage.value = "";
      fieldErrors.value = {};
    } else {
      // Load provinces when modal opens
      if (provinces.value.length === 0) {
        await loadProvinces();
      }

      if (props.editingAddress) {
        // Populate form when modal opens with editing address
        form.value = {
          label: props.editingAddress.label || "",
          name: props.editingAddress.name || "",
          phone: props.editingAddress.phone || "",
          fullAddress: props.editingAddress.fullAddress || "",
          province: props.editingAddress.province || "",
          city: props.editingAddress.city || "",
          postalCode: props.editingAddress.postalCode || "",
          administrativeRegion: props.editingAddress.administrativeRegion || "",
          isPrimary: props.editingAddress.isPrimary || false,
          province_id: props.editingAddress.province_id,
          city_id: props.editingAddress.city_id,
          district_id: props.editingAddress.district_id,
          sub_district_id: props.editingAddress.sub_district_id,
        };

        // Set dropdowns if we have IDs or names
        if (props.editingAddress.province_id) {
          selectedProvinceId.value = props.editingAddress.province_id;
          if (props.editingAddress.city_id) {
            await loadCities(props.editingAddress.province_id);
            selectedCityId.value = props.editingAddress.city_id;
            if (props.editingAddress.district_id) {
              await loadDistricts(props.editingAddress.city_id);
              selectedDistrictId.value = props.editingAddress.district_id;
              if (props.editingAddress.sub_district_id) {
                await loadSubDistricts(props.editingAddress.district_id);
                selectedSubDistrictId.value =
                  props.editingAddress.sub_district_id;
              }
            }
          }
        } else if (props.editingAddress.province) {
          const provinceId = await findProvinceId(
            props.editingAddress.province,
          );
          if (provinceId) {
            selectedProvinceId.value = provinceId;
            if (props.editingAddress.city) {
              await loadCities(provinceId);
              const cityId =
                props.editingAddress.city_id ||
                (await findCityId(props.editingAddress.city, provinceId));
              if (cityId) {
                selectedCityId.value = cityId;
                if (props.editingAddress.district_id) {
                  await loadDistricts(cityId);
                  selectedDistrictId.value = props.editingAddress.district_id;
                  if (props.editingAddress.sub_district_id) {
                    await loadSubDistricts(props.editingAddress.district_id);
                    selectedSubDistrictId.value =
                      props.editingAddress.sub_district_id;
                  }
                }
              }
            }
          }
        }

        errorMessage.value = "";
        fieldErrors.value = {};
      }
    }
  },
);

const handleClose = () => {
  errorMessage.value = "";
  fieldErrors.value = {};
  emit("update:modelValue", false);
};

const setError = (message: string, errors?: Record<string, string[]>) => {
  errorMessage.value = message;
  fieldErrors.value = errors || {};
};

const clearError = () => {
  errorMessage.value = "";
  fieldErrors.value = {};
};

defineExpose({
  setError,
  clearError,
});

const handleSubmit = () => {
  errorMessage.value = "";
  fieldErrors.value = {};

  if (!form.value.name || !form.value.name.trim()) {
    fieldErrors.value.name = ["Nama penerima harus diisi"];
    return;
  }

  if (!form.value.phone || !form.value.phone.trim()) {
    fieldErrors.value.phone = ["Nomor HP harus diisi"];
    return;
  }

  if (!selectedProvinceId.value) {
    fieldErrors.value.province = ["Provinsi harus dipilih"];
    return;
  }

  if (!selectedCityId.value) {
    fieldErrors.value.city = ["Kota/Kabupaten harus dipilih"];
    return;
  }

  if (!selectedDistrictId.value) {
    fieldErrors.value.district = ["Kecamatan harus dipilih"];
    return;
  }

  if (!selectedSubDistrictId.value) {
    fieldErrors.value.sub_district = ["Kelurahan harus dipilih"];
    return;
  }

  if (!form.value.postalCode || !form.value.postalCode.trim()) {
    fieldErrors.value.postal_code = ["Kode pos harus diisi"];
    return;
  }

  if (!form.value.fullAddress || !form.value.fullAddress.trim()) {
    fieldErrors.value.address = ["Alamat lengkap harus diisi"];
    return;
  }

  const addressData: Address = {
    ...form.value,
    province_id: selectedProvinceId.value,
    province_label: selectedProvince.value?.name || form.value.province,
    city_id: selectedCityId.value,
    city_label: selectedCity.value?.name || form.value.city,
    district_id: selectedDistrictId.value,
    district_label: selectedDistrict.value?.name || "",
    sub_district_id: selectedSubDistrictId.value,
    sub_district_label: selectedSubDistrict.value?.name || "",
    ...(props.editingAddress?.id && { id: props.editingAddress.id }),
  };

  emit("save", addressData);
};
</script>
