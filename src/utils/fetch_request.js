async function getArraybuffer(url = "") {
  const response = await fetch(url, {
    method: "get",
    mode: "no-cors",
  });
  return response.arrayBuffer();
}

export default { getArraybuffer };
