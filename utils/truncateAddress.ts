function TruncateAddress(address: string): string {
    const firstFive = address.slice(0, 5);
    const lastFive = address.slice(-5);

    return `${firstFive}...${lastFive}`;
}

export default TruncateAddress;