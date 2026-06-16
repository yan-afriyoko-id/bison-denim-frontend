<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-10 flex-1">
      <div class="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12.5">
        <!-- Left Sidebar: Account Navigation -->
        <AccountSidebar />

        <!-- Right Content: Address List -->
        <div class="flex-1 py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-5">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6 sm:mb-8">
            <h1 class="text-base sm:text-lg md:text-xl font-semibold text-[#1A1919]">
              Alamat Saya
            </h1>
            <button
              @click="handleAddNew"
              class="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#E9322B] text-white rounded-lg text-sm sm:text-base md:text-lg font-medium hover:bg-[#D32A24] transition cursor-pointer w-full sm:w-auto"
            >
              +Alamat
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="text-center py-10">
            <p class="text-sm sm:text-base text-[#7B7B7B]">Memuat alamat...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="addresses.length === 0" class="text-center py-10 sm:py-12">
            <p class="text-sm sm:text-base text-[#7B7B7B] mb-4">Belum ada alamat yang tersimpan</p>
            <button
              @click="handleAddNew"
              class="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#E9322B] text-white rounded-lg text-sm sm:text-base md:text-lg font-medium hover:bg-[#D32A24] transition cursor-pointer"
            >
              + Tambah Alamat
            </button>
          </div>

          <!-- Address Cards -->
          <div v-else class="space-y-4 sm:space-y-5">
            <div
              v-for="address in addresses"
              :key="address.id"
              class="bg-white border border-[#E6E9F0] rounded-lg px-4 sm:px-5 py-5 sm:py-7.5"
            >
              <div class="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4 sm:gap-0">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 sm:gap-2.5 mb-1.5 flex-wrap">
                    <h3 class="text-base sm:text-lg font-semibold text-[#1A1919]">
                      {{ address.label }}
                    </h3>
                    <span
                      v-if="address.isPrimary"
                      class="px-2 sm:px-2.5 py-0.5 text-xs sm:text-sm text-[#E9322B] rounded border border-[#E9322B] whitespace-nowrap"
                    >
                      Utama
                    </span>
                  </div>
                  <div class="flex items-center gap-1 text-sm sm:text-base md:text-lg mb-2 sm:mb-2.5 flex-wrap">
                    <p class="text-[#1A1919]">
                      {{ address.name }}
                    </p>
                    <div class="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0">
                      <svg
                        class="w-full h-full"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 4.37521C7.36003 4.37521 7.69954 4.44357 8.01855 4.58029C8.33757 4.71701 8.61556 4.90386 8.85254 5.14084C9.08952 5.37782 9.27865 5.65809 9.41992 5.98166C9.5612 6.30523 9.62956 6.64474 9.625 7.00021C9.625 7.3648 9.55664 7.70432 9.41992 8.01877C9.2832 8.33322 9.09635 8.61122 8.85938 8.85275C8.6224 9.09429 8.34212 9.28342 8.01855 9.42014C7.69499 9.55685 7.35547 9.62521 7 9.62521C6.63542 9.62521 6.2959 9.55685 5.98145 9.42014C5.66699 9.28342 5.389 9.09657 5.14746 8.85959C4.90592 8.62261 4.7168 8.34461 4.58008 8.0256C4.44336 7.70659 4.375 7.3648 4.375 7.00021C4.375 6.64019 4.44336 6.30067 4.58008 5.98166C4.7168 5.66265 4.90365 5.38465 5.14062 5.14767C5.3776 4.9107 5.6556 4.72157 5.97461 4.58029C6.29362 4.43902 6.63542 4.37066 7 4.37521Z"
                          fill="#ACACAC"
                        />
                      </svg>
                    </div>

                    <p class="text-[#7B7B7B]">
                      {{ address.phone }}
                    </p>
                  </div>

                  <p class="text-sm sm:text-base md:text-lg text-[#7B7B7B] leading-relaxed">
                    {{ address.fullAddress }}
                  </p>
                </div>

                <div
                  class="flex flex-col gap-2 sm:gap-2.5 items-start sm:items-end justify-center w-full sm:w-auto"
                >
                  <div class="flex items-center gap-4 sm:gap-6">
                    <button
                      @click="handleEdit(address)"
                      class="text-sm sm:text-base md:text-lg text-[#7B7B7B] hover:underline cursor-pointer"
                    >
                      Ubah
                    </button>
                    <div class="w-px h-4 sm:h-5 bg-[#E6E9F0]"></div>
                    <button
                      @click="handleDelete(address.id)"
                      class="text-sm sm:text-base md:text-lg text-[#E9322B] hover:underline cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                  <button
                    v-if="!address.isPrimary"
                    @click="handleSetPrimary(address.id)"
                    class="text-sm sm:text-base md:text-lg px-2 py-1 font-medium text-[#7B7B7B] hover:text-[#E9322B] hover:underline cursor-pointer"
                  >
                    Atur sebagai utama
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Address Modal -->
    <AddressModal
      ref="addressModalRef"
      v-model="showAddModal"
      :editingAddress="editingAddress"
      @save="handleSaveAddress"
    />

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      v-model="showDeleteConfirmModal"
      title="Hapus Alamat?"
      message="Kamu akan menghapus alamat pengiriman ini."
      confirm-text="Hapus"
      @confirm="confirmDeleteAddress"
    />
    </div>
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { useShippingAddressApi } from '~/composables/useShippingAddressApi'

definePageMeta({
  layout: "default",
  middleware: "auth",
});

useHead({
  title: 'Alamat Saya',
});

const { getAddresses, getAddress, createAddress, updateAddress, deleteAddress } = useShippingAddressApi()

const addresses = ref<Array<{
  id: number
  label: string
  name: string
  phone: string
  fullAddress: string
  isPrimary: boolean
}>>([])

const isLoading = ref(true)
const showAddModal = ref(false)
const editingAddress = ref<any>(null)
const showDeleteConfirmModal = ref(false)
const addressToDelete = ref<number | null>(null)
const addressModalRef = ref<any>(null)

// Load addresses from API
const loadAddresses = async () => {
  isLoading.value = true
  try {
    const { data, error } = await getAddresses()
    
    if (error || !data?.success) {
      console.error('Error loading addresses:', error)
      addresses.value = []
      return
    }
    
    // Transform API response to format expected by UI
    addresses.value = data.data.map((addr) => ({
      id: addr.id,
      label: addr.label_place || 'Alamat',
      name: `${addr.first_name} ${addr.last_name || ''}`.trim(),
      phone: addr.phone,
      fullAddress: `${addr.address}, ${addr.city}, ${addr.province}, ${addr.postal_code}`,
      isPrimary: addr.is_primary,
    }))
  } catch (err) {
    console.error('Error loading addresses:', err)
    addresses.value = []
  } finally {
    isLoading.value = false
  }
}

const handleAddNew = () => {
  editingAddress.value = null
  showAddModal.value = true
}

const handleEdit = async (address: any) => {
  try {
    // Load full address data from API
    const { data, error } = await getAddress(address.id)
    
    if (error || !data?.success) {
      alert(error?.message || 'Gagal memuat data alamat')
      return
    }
    
    const addr = data.data
    editingAddress.value = {
      id: addr.id,
      label: addr.label_place || 'Alamat',
      name: `${addr.first_name} ${addr.last_name || ''}`.trim(),
      phone: addr.phone,
      fullAddress: addr.address || '',
      province: addr.province || '',
      city: addr.city || '',
      postalCode: addr.postal_code || '',
      isPrimary: addr.is_primary,
      province_id: addr.province_id || null,
      city_id: addr.city_id || null,
      district_id: addr.district_id || null,
      sub_district_id: addr.sub_district_id || null,
    }
    showAddModal.value = true
  } catch (err) {
    console.error('Error loading address:', err)
    alert('Terjadi kesalahan saat memuat data alamat')
  }
}

const handleDelete = (id: number) => {
  addressToDelete.value = id
  showDeleteConfirmModal.value = true
}

const confirmDeleteAddress = async () => {
  if (addressToDelete.value === null) return
  
  try {
    const { data, error } = await deleteAddress(addressToDelete.value)
    
    if (error || !data?.success) {
      alert(error?.message || 'Gagal menghapus alamat')
      return
    }
    
    // Reload addresses
    await loadAddresses()
    showDeleteConfirmModal.value = false
    addressToDelete.value = null
  } catch (err) {
    console.error('Error deleting address:', err)
    alert('Terjadi kesalahan saat menghapus alamat')
  }
}

const handleSetPrimary = async (id: number) => {
  try {
    const { data, error } = await updateAddress(id, { is_primary: true })
    
    if (error || !data?.success) {
      alert(error?.message || 'Gagal mengatur alamat utama')
      return
    }
    
    // Reload addresses
    await loadAddresses()
  } catch (err) {
    console.error('Error setting primary address:', err)
    alert('Terjadi kesalahan saat mengatur alamat utama')
  }
}

const handleSaveAddress = async (addressData: any) => {
  try {
    const nameParts = addressData.name.split(' ')
    
    const payload = {
      first_name: nameParts[0] || '',
      last_name: nameParts.slice(1).join(' ') || null,
      phone: addressData.phone,
      email: null,
      label_place: addressData.label || null,
      address: addressData.fullAddress || '',
      city: addressData.city || '',
      province: addressData.province || '',
      postal_code: addressData.postalCode || '',
      note_address: null,
      is_primary: addressData.isPrimary || false,
      province_id: addressData.province_id || null,
      province_label: addressData.province_label || null,
      city_id: addressData.city_id || null,
      city_label: addressData.city_label || null,
      district_id: addressData.district_id || null,
      district_label: addressData.district_label || null,
      sub_district_id: addressData.sub_district_id || null,
      sub_district_label: addressData.sub_district_label || null,
    }
    
    let result
    if (editingAddress.value && editingAddress.value.id) {
      result = await updateAddress(editingAddress.value.id, payload)
    } else {
      result = await createAddress(payload)
    }
    
    const { data, error } = result
    
    if (error || !data?.success) {
      const errorMessage = error?.message || data?.message || 'Gagal menyimpan alamat'
      const fieldErrors = error?.errors || {}
      
      if (addressModalRef.value) {
        addressModalRef.value.setError(errorMessage, fieldErrors)
      }
      
      return
    }
    
    await loadAddresses()
    editingAddress.value = null
    showAddModal.value = false
  } catch (err: any) {
    console.error('Error saving address:', err)
    
    const errorMessage = err?.data?.message || err?.message || 'Terjadi kesalahan saat menyimpan alamat'
    const fieldErrors = err?.data?.errors || {}
    
    if (addressModalRef.value) {
      addressModalRef.value.setError(errorMessage, fieldErrors)
    }
  }
}

// Load addresses on mount
onMounted(() => {
  loadAddresses()
})
</script>
