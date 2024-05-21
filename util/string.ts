
export function StrToBool(S: string): boolean {
  return (S.toLowerCase() === "true" || S === "1" || S === "T")
}

export function BoolToStr(B: boolean): string {
  return (B ? "true" : "false")
}

export function SizeFromLength(S: string): string {
  const L = S.length;
  console.log({ L });

  // Define the size mapping
  const sizeMapping = [
    { maxLen: 6, size: '4xl' },
    { maxLen: 12, size: '3xl' },
    { maxLen: 24, size: '2xl' },
    { maxLen: 40, size: 'xl' },
    { maxLen: 48, size: 'lg' },
    { maxLen: 50, size: 'md' },
    { maxLen: 60, size: 'sm' },
    { maxLen: 70, size: 'xs' },
  ];

  // Find the appropriate size based on length
  for (const { maxLen, size } of sizeMapping) {
    if (L <= maxLen) {
      return `text-${size}`;
    }
  }

  return 'text-4xl'; // Equivalent to text-xs but can be adjusted for even smaller sizes
}
