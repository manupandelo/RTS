import axios from "axios";

const getTaskHandlers = (params) => {
    const handleCompleteTask = async () => {
        try {
          await axios.put(`https://rts-back.onrender.com/realizarTarea`, {id: params.row.id});
          window.location.reload();
        } catch (error) {
          console.error('Error al marcar la tarea como realizada:', error);
        }
    };

    const handleUncompleteTask = async () => {
        try {
          await axios.put(`https://rts-back.onrender.com/desmarcarTarea`, {id: params.row.id});
          window.location.reload();
        } catch (error) {
          console.error('Error al desmarcar la tarea como realizada:', error);
        }
    };

    const handleNotApplicableTask = async () => {
        try {
            await axios.put(`https://rts-back.onrender.com/noaplica`, {id: params.row.id});
            window.location.reload();
        } catch (error) {
            console.error('Error al marcar la tarea como no aplicable:', error);
        }
    };

    return {
        handleNotApplicableTask,
        handleCompleteTask,
        handleUncompleteTask
    };
};

export default getTaskHandlers;