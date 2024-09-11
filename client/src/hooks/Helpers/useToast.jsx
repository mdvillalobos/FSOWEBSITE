import Swal from 'sweetalert2'

const useToast = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    return {Toast}
}

export default useToast
